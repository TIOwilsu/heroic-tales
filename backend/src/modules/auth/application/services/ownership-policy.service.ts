import { Injectable } from "@nestjs/common";
import type { AuthenticatedUserDTO } from "../../domain/dtos/authenticated-user.dto";
import { ErrorDTO } from "../../../../shared/domain/dtos/error.dto";

@Injectable()
export class OwnershipPolicyService {
  public requireAuthenticatedUser(
    user: AuthenticatedUserDTO | undefined,
  ): AuthenticatedUserDTO {
    if (!user) {
      throw new ErrorDTO("Authentication is required.", "AUTHENTICATION_REQUIRED");
    }

    return user;
  }

  public assertOwnership(
    user: AuthenticatedUserDTO | undefined,
    ownerId: string,
  ): void {
    const authenticatedUser = this.requireAuthenticatedUser(user);

    if (authenticatedUser.id !== ownerId) {
      throw new ErrorDTO("The authenticated user does not own this resource.", "OWNERSHIP_DENIED");
    }
  }
}

