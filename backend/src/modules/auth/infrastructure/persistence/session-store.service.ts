import { Injectable } from "@nestjs/common";
import type { SessionRecordDTO } from "../../domain/dtos/session-record.dto";
import type { ISessionStoreService } from "../../domain/interfaces/session-store-service.interface";

@Injectable()
export class SessionStoreService implements ISessionStoreService {
  private readonly _accessRecords = new Map<string, SessionRecordDTO>();
  private readonly _refreshRecords = new Map<string, SessionRecordDTO>();

  public async create(session: SessionRecordDTO): Promise<void> {
    this._accessRecords.set(session.accessTokenDigest, session);
    this._refreshRecords.set(session.refreshTokenDigest, session);
  }

  public async findByAccessTokenDigest(
    accessTokenDigest: string,
  ): Promise<SessionRecordDTO | undefined> {
    return this._accessRecords.get(accessTokenDigest);
  }

  public async findByRefreshTokenDigest(
    refreshTokenDigest: string,
  ): Promise<SessionRecordDTO | undefined> {
    return this._refreshRecords.get(refreshTokenDigest);
  }

  public async deleteByAccessTokenDigest(accessTokenDigest: string): Promise<void> {
    const session = this._accessRecords.get(accessTokenDigest);
    if (session) {
      this._accessRecords.delete(session.accessTokenDigest);
      this._refreshRecords.delete(session.refreshTokenDigest);
    }
  }

  public async deleteByRefreshTokenDigest(refreshTokenDigest: string): Promise<void> {
    const session = this._refreshRecords.get(refreshTokenDigest);
    if (session) {
      this._refreshRecords.delete(session.refreshTokenDigest);
      this._accessRecords.delete(session.accessTokenDigest);
    }
  }
}
