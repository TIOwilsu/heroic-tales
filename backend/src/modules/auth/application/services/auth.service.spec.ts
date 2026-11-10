import { AuthService } from "./auth.service.js";
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
  readonly _records = new Map<string, SessionRecord>();

  async create(session: SessionRecord) {
    this._records.set(session.tokenDigest, session);
  }

  async findByTokenDigest(tokenDigest: string) {
    return this._records.get(tokenDigest);
  }

  async deleteByTokenDigest(tokenDigest: string) {
    this._records.delete(tokenDigest);
  }
}

describe("AuthService", () => {
  it("hashes credentials and resolves an authenticated session without exposing the password", async () => {
    const accounts = new FakeAccountStore();
    const sessions = new FakeSessionStore();
    const cryptoService = new AuthCryptoService();
    const service = new AuthService(accounts, sessions, cryptoService, {
      createUserId: () => "user-1",
      sessionDurationMs: 60_000,
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
    await expect(service.resolveUser(session.sessionToken)).resolves.toEqual({
      id: "user-1",
      email: "hero@example.com",
    });
  });

  it("rejects invalid credentials and expires sessions", async () => {
    const accounts = new FakeAccountStore();
    const sessions = new FakeSessionStore();
    const cryptoService = new AuthCryptoService();
    const service = new AuthService(accounts, sessions, cryptoService, {
      createUserId: () => "user-1",
      sessionDurationMs: -1,
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
    await expect(service.resolveUser(session.sessionToken)).resolves.toBeUndefined();
    expect(sessions._records.size).toBe(0);
  });
});
