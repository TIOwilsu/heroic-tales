export interface SessionRecordDTO {
  readonly tokenDigest: string;
  readonly userId: string;
  readonly expiresAt: Date;
}
