import { AuthService } from "./auth.service";
import type { IAccountStoreService } from "../../domain/interfaces/account-store-service.interface.js";
import type { ISessionStoreService } from "../../domain/interfaces/session-store-service.interface.js";
import { AuthCryptoService } from "./auth-crypto.service";
import type { AccountRecordDTO as AccountRecord } from "../../domain/dtos/account-record.dto.js";
import type { SessionRecordDTO as SessionRecord } from "../../domain/dtos/session-record.dto.js";

class FakeAccountStore implements IAccountStoreService {
  private readonly _records = new Map<string, AccountRecord>();

  async findByEmail(email: string) {
    return [...this._records.values()].find((record) => record.email === email);
  }

  async findById(id: string) {
    return this._records.get(id);
  }

  async create(account: AccountRecord) {
    this._records.set(account.id, account);
  }
}

class FakeSessionStore implements ISessionStoreService {
  readonly _accessRecords = new Map<string, SessionRecord>();
  readonly _refreshRecords = new Map<string, SessionRecord>();

  async create(session: SessionRecord) {
    this._accessRecords.set(session.accessTokenDigest, session);
    this._refreshRecords.set(session.refreshTokenDigest, session);
  }

  async findByAccessTokenDigest(accessTokenDigest: string) {
    return this._accessRecords.get(accessTokenDigest);
  }

  async findByRefreshTokenDigest(refreshTokenDigest: string) {
    return this._refreshRecords.get(refreshTokenDigest);
  }

  async deleteByAccessTokenDigest(accessTokenDigest: string) {
    const session = this._accessRecords.get(accessTokenDigest);
    if (session) {
      this._accessRecords.delete(session.accessTokenDigest);
      this._refreshRecords.delete(session.refreshTokenDigest);
    }
  }

  async deleteByRefreshTokenDigest(refreshTokenDigest: string) {
    const session = this._refreshRecords.get(refreshTokenDigest);
    if (session) {
      this._refreshRecords.delete(session.refreshTokenDigest);
      this._accessRecords.delete(session.accessTokenDigest);
    }
  }
}

describe("AuthService", () => {
  it("hashes credentials and issues bearer tokens without exposing the password", async () => {
    const accounts = new FakeAccountStore();
    const sessions = new FakeSessionStore();
    const cryptoService = new AuthCryptoService();
    const service = new AuthService(accounts, sessions, cryptoService, {
      createUserId: () => "user-1",
      accessTokenDurationMs: 60_000,
      refreshTokenDurationMs: 120_000,
    });

    await expect(
      service.register({
        email: " HERO@example.com ",
        password: "a sufficiently strong password",
      }),
    ).resolves.toEqual({ id: "user-1", email: "hero@example.com" });

    const storedAccount = await accounts.findById("user-1");
    expect(storedAccount?.passwordHash).toBeDefined();
    expect(storedAccount?.passwordHash).not.toContain("a sufficiently strong password");

    const session = await service.authenticate({
      email: "hero@example.com",
      password: "a sufficiently strong password",
    });
    await expect(service.resolveUser(session.accessToken)).resolves.toEqual({
      id: "user-1",
      email: "hero@example.com",
    });
    await expect(service.refresh(session.refreshToken)).resolves.toMatchObject({
      user: { id: "user-1", email: "hero@example.com" },
    });
  });

  it("rejects invalid credentials and expires access/refresh tokens", async () => {
    const accounts = new FakeAccountStore();
    const sessions = new FakeSessionStore();
    const cryptoService = new AuthCryptoService();
    const service = new AuthService(accounts, sessions, cryptoService, {
      createUserId: () => "user-1",
      accessTokenDurationMs: -1,
      refreshTokenDurationMs: -1,
    });

    await service.register({
      email: "hero@example.com",
      password: "a sufficiently strong password",
    });

    await expect(
      service.authenticate({ email: "hero@example.com", password: "wrong password" }),
    ).rejects.toThrow("Invalid credentials.");

    const session = await service.authenticate({
      email: "hero@example.com",
      password: "a sufficiently strong password",
    });
    await expect(service.resolveUser(session.accessToken)).resolves.toBeUndefined();
    await expect(service.refresh(session.refreshToken)).resolves.toBeUndefined();
    expect(sessions._accessRecords.size).toBe(0);
    expect(sessions._refreshRecords.size).toBe(0);
  });

  it("rotates refresh tokens and invalidates the previous refresh token", async () => {
    const accounts = new FakeAccountStore();
    const sessions = new FakeSessionStore();
    const service = new AuthService(accounts, sessions, new AuthCryptoService(), {
      createUserId: () => "user-1",
    });

    await service.register({
      email: "hero@example.com",
      password: "a sufficiently strong password",
    });
    const first = await service.authenticate({
      email: "hero@example.com",
      password: "a sufficiently strong password",
    });
    const rotated = await service.refresh(first.refreshToken);

    expect(rotated?.refreshToken).toBeDefined();
    await expect(service.refresh(first.refreshToken)).resolves.toBeUndefined();
  });
});
