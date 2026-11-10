export interface SessionRecordDTO {
  readonly accessTokenDigest: string;
  readonly refreshTokenDigest: string;
  readonly userId: string;
  readonly accessTokenExpiresAt: Date;
  readonly refreshTokenExpiresAt: Date;
}
