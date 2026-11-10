import type { AuthenticatedUserDTO } from "./authenticated-user.dto";

export interface AuthenticatedSessionDTO {
  readonly user: AuthenticatedUserDTO;
  readonly sessionToken: string;
  readonly expiresAt: Date;
}
