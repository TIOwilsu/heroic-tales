import { randomUUID } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import type { IAccountStoreService } from "../../domain/interfaces/account-store-service.interface";
import type { ISessionStoreService } from "../../domain/interfaces/session-store-service.interface";
import type { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { ErrorDTO } from "../../../../shared/domain/dtos/error.dto";
import type { IAuthCryptService } from "../../domain/interfaces/auth-crypt-service.interface";
import type { AccountRecordDTO } from "../../domain/dtos/account-record.dto";
import type { AuthenticatedSessionDTO } from "../../domain/dtos/authenticated-session.dto";
import type { AuthenticatedUserDTO } from "../../domain/dtos/authenticated-user.dto";
import type { CredentialsDTO } from "../../domain/dtos/credentials.dto";
import type { SessionRecordDTO } from "../../domain/dtos/session-record.dto";

const DEFAULT_ACCESS_TOKEN_DURATION_MS = 1000 * 60 * 15;
const DEFAULT_REFRESH_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class AuthService {
  private readonly _accessTokenDurationMs: number;
  private readonly _refreshTokenDurationMs: number;
  private readonly _createUserId: () => string;

  constructor(
    @Inject('AUTH_ACCOUNT_STORE') private readonly _accounts:  IAccountStoreService,
    @Inject('AUTH_SESSION_STORE') private readonly _sessions: ISessionStoreService,
    @Inject('AUTH_CRYPTO_SERVICE') private readonly _cryptService: IAuthCryptService,
    @Inject('AUTH_OPTIONS') options: IAuthService,
  ) {
    this._accessTokenDurationMs =
      options.accessTokenDurationMs ?? DEFAULT_ACCESS_TOKEN_DURATION_MS;
    this._refreshTokenDurationMs =
      options.refreshTokenDurationMs ?? DEFAULT_REFRESH_TOKEN_DURATION_MS;
    this._createUserId = options.createUserId ?? randomUUID;
  }

  public async register(credentials: CredentialsDTO): Promise<AuthenticatedUserDTO> {
    const email = this._normalizeEmail(credentials.email);
    const password = this._validatePassword(credentials.password);

    if (await this._accounts.findByEmail(email)) {
      throw new ErrorDTO(
        "An account already exists for this email.",
        "AUTH_ACCOUNT_ALREADY_EXISTS",
      );
    }

    const account: AccountRecordDTO = {
      id: this._createUserId(),
      email,
      passwordHash: await this._cryptService.hashPassword(password),
    };
    await this._accounts.create(account);

    return this._toAuthenticatedUser(account);
  }

  public async authenticate(credentials: CredentialsDTO): Promise<AuthenticatedSessionDTO> {
    const account = await this._accounts.findByEmail(
      this._normalizeEmail(credentials.email),
    );
    const valid = account
      ? await this._cryptService.verifyPassword(credentials.password, account.passwordHash)
      : false;

    if (!account || !valid) {
      throw new ErrorDTO("Invalid credentials.", "AUTH_INVALID_CREDENTIALS");
    }

    const accessToken = this._cryptService.createAccessToken();
    const refreshToken = this._cryptService.createRefreshToken();
    const accessTokenExpiresAt = new Date(
      Date.now() + this._accessTokenDurationMs,
    );
    const refreshTokenExpiresAt = new Date(
      Date.now() + this._refreshTokenDurationMs,
    );
    const session: SessionRecordDTO = {
      accessTokenDigest: this._cryptService.digestToken(accessToken),
      refreshTokenDigest: this._cryptService.digestToken(refreshToken),
      userId: account.id,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };

    await this._sessions.create(session);
    return {
      user: this._toAuthenticatedUser(account),
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };
  }

  public async refresh(
    refreshToken: string | undefined,
  ): Promise<AuthenticatedSessionDTO | undefined> {
    if (!refreshToken) {
      return undefined;
    }

    const refreshTokenDigest = this._cryptService.digestToken(refreshToken);
    const session = await this._sessions.findByRefreshTokenDigest(
      refreshTokenDigest,
    );
    if (!session) {
      return undefined;
    }

    if (session.refreshTokenExpiresAt.getTime() <= Date.now()) {
      await this._sessions.deleteByRefreshTokenDigest(refreshTokenDigest);
      return undefined;
    }

    const account = await this._accounts.findById(session.userId);
    if (!account) {
      await this._sessions.deleteByRefreshTokenDigest(refreshTokenDigest);
      return undefined;
    }

    await this._sessions.deleteByRefreshTokenDigest(refreshTokenDigest);
    return this._issueSession(account);
  }

  public async resolveUser(
    accessToken: string | undefined,
  ): Promise<AuthenticatedUserDTO | undefined> {
    if (!accessToken) {
      return undefined;
    }

    const accessTokenDigest = this._cryptService.digestToken(accessToken);
    const session = await this._sessions.findByAccessTokenDigest(
      accessTokenDigest,
    );
    if (!session) {
      return undefined;
    }

    if (session.accessTokenExpiresAt.getTime() <= Date.now()) {
      await this._sessions.deleteByAccessTokenDigest(accessTokenDigest);
      return undefined;
    }

    const account = await this._accounts.findById(session.userId);
    return account ? this._toAuthenticatedUser(account) : undefined;
  }

  public async revoke(refreshToken: string | undefined): Promise<void> {
    if (refreshToken) {
      await this._sessions.deleteByRefreshTokenDigest(
        this._cryptService.digestToken(refreshToken),
      );
    }
  }

  private async _issueSession(
    account: AccountRecordDTO,
  ): Promise<AuthenticatedSessionDTO> {
    const accessToken = this._cryptService.createAccessToken();
    const refreshToken = this._cryptService.createRefreshToken();
    const accessTokenExpiresAt = new Date(
      Date.now() + this._accessTokenDurationMs,
    );
    const refreshTokenExpiresAt = new Date(
      Date.now() + this._refreshTokenDurationMs,
    );

    await this._sessions.create({
      accessTokenDigest: this._cryptService.digestToken(accessToken),
      refreshTokenDigest: this._cryptService.digestToken(refreshToken),
      userId: account.id,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    });

    return {
      user: this._toAuthenticatedUser(account),
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };
  }

  private _normalizeEmail(email: string): string {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !normalized.includes("@")) {
      throw new ErrorDTO(
        "A valid email address is required.",
        "AUTH_INVALID_INPUT",
      );
    }

    return normalized;
  }

  private _validatePassword(password: string): string {
    if (password.length < 12) {
      throw new ErrorDTO(
        "Password must contain at least 12 characters.",
        "AUTH_INVALID_INPUT",
      );
    }

    return password;
  }

  private _toAuthenticatedUser(account: AccountRecordDTO): AuthenticatedUserDTO {
    return { id: account.id, email: account.email };
  }
}
  
