import type { SessionRecordDTO } from "../dtos/session-record.dto";

export interface ISessionStoreService {
  create(session: SessionRecordDTO): Promise<void>;
  findByAccessTokenDigest(
    accessTokenDigest: string,
  ): Promise<SessionRecordDTO | undefined>;
  findByRefreshTokenDigest(
    refreshTokenDigest: string,
  ): Promise<SessionRecordDTO | undefined>;
  deleteByAccessTokenDigest(accessTokenDigest: string): Promise<void>;
  deleteByRefreshTokenDigest(refreshTokenDigest: string): Promise<void>;
}
