import { Injectable } from "@nestjs/common";
import type { SessionRecordDTO } from "../../domain/dtos/session-record.dto";
import type { ISessionStoreService } from "../../domain/interfaces/session-store-service.interface";

@Injectable()
export class SessionStoreService implements ISessionStoreService {
  private readonly _records = new Map<string, SessionRecordDTO>();

  public async create(session: SessionRecordDTO): Promise<void> {
    this._records.set(session.tokenDigest, session);
  }

  public async findByTokenDigest(
    tokenDigest: string,
  ): Promise<SessionRecordDTO | undefined> {
    return this._records.get(tokenDigest);
  }

  public async deleteByTokenDigest(tokenDigest: string): Promise<void> {
    this._records.delete(tokenDigest);
  }
}
