import type { AuthenticatedUserDTO } from "./authenticated-user.dto";

export interface AccountRecordDTO extends AuthenticatedUserDTO {
  readonly passwordHash: string;
}
