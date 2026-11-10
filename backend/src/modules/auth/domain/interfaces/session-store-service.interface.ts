import type { SessionRecordDTO } from "../dtos/session-record.dto";

export interface ISessionStoreService {
  create(session: SessionRecordDTO): Promise<void>;
  findByTokenDigest(tokenDigest: string): Promise<SessionRecordDTO | undefined>;
  deleteByTokenDigest(tokenDigest: string): Promise<void>;
}
