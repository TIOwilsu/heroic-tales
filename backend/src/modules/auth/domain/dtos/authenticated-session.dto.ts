import type { AuthenticatedUserDTO } from "./authenticated-user.dto";

export interface AuthenticatedSessionDTO {
  readonly user: AuthenticatedUserDTO;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresAt: Date;
  readonly refreshTokenExpiresAt: Date;
}
