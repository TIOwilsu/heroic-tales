import { AuthenticatedUserDTO } from "@/modules/core/auth/infrastructure/dtos/authenticated-user.dto";

export interface AuthenticatedRequestDTO {
  readonly headers: {
    readonly authorization?: string;
  };
  user?: AuthenticatedUserDTO;
}
