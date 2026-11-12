import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AppError } from "@/shared/application/errors/app-error";
import { GetUserInputDTO } from "@/modules/core/user/application/dtos/get-user-input.dto";
import { IUserRepository } from "@/modules/core/user/infrastructure/interfaces/user-repository.interface";
import { USER_REPOSITORY } from "@/modules/core/user/user.tokens";
import { UserResultDTO } from "@/modules/core/user/domain/dtos/user-result.dto";

@QueryHandler(GetUserInputDTO)
export class GetUserUseCase
  implements IQueryHandler<GetUserInputDTO, UserResultDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _repository: IUserRepository,
  ) {}

  public async execute(
    query: GetUserInputDTO,
  ): Promise<UserResultDTO> {
    const userId = query.userId.trim();

    if (!userId) {
      throw new AppError(400, "AUTH_INVALID_INPUT", "A user ID is required.");
    }

    const user = await this._repository.findById(userId);

    if (!user) {
      throw new AppError(404, "AUTH_USER_NOT_FOUND", "User not found.");
    }

    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
