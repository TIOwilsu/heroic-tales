export interface IAuthService {
  readonly sessionDurationMs?: number;
  readonly createUserId?: () => string;
}
