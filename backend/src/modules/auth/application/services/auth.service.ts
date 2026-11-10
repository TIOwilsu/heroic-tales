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

const DEFAULT_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class AuthService {
  private readonly _sessionDurationMs: number;
  private readonly _createUserId: () => string;

  constructor(
    @Inject('AUTH_ACCOUNT_STORE') private readonly _accounts:  IAccountStoreService,
    @Inject('AUTH_SESSION_STORE') private readonly _sessions: ISessionStoreService,
    @Inject('AUTH_CRYPTO_SERVICE') private readonly _cryptService: IAuthCryptService,
    @Inject('AUTH_OPTIONS') options: IAuthService,
  ) {
    this._sessionDurationMs =
      options.sessionDurationMs ?? DEFAULT_SESSION_DURATION_MS;
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

    const sessionToken = this._cryptService.createSessionToken();
    const expiresAt = new Date(Date.now() + this._sessionDurationMs);
    const session: SessionRecordDTO = {
      tokenDigest: this._cryptService.digestSessionToken(sessionToken),
      userId: account.id,
      expiresAt,
    };

    await this._sessions.create(session);
    return { user: this._toAuthenticatedUser(account), sessionToken, expiresAt };
  }

  public async resolveUser(sessionToken: string | undefined): Promise<AuthenticatedUserDTO | undefined> {
    if (!sessionToken) {
      return undefined;
    }

    const session = await this._sessions.findByTokenDigest(
      this._cryptService.digestSessionToken(sessionToken),
    );
    if (!session) {
      return undefined;
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      await this._sessions.deleteByTokenDigest(session.tokenDigest);
      return undefined;
    }

    const account = await this._accounts.findById(session.userId);
    return account ? this._toAuthenticatedUser(account) : undefined;
  }

  public async revoke(sessionToken: string | undefined): Promise<void> {
    if (sessionToken) {
      await this._sessions.deleteByTokenDigest(this._cryptService.digestSessionToken(sessionToken));
    }
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
  
