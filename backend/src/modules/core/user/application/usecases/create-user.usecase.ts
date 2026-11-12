import { randomUUID } from "node:crypto";
import { AppError } from "@/shared/application/errors/app-error";
import { IUserRepository } from "@/modules/core/user/infrastructure/interfaces/user-repository.interface";
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserInputDTO } from "@/modules/core/user/application/dtos/create-user-input.dto";
import { UserResultDTO } from "@/modules/core/user/domain/dtos/user-result.dto";
import { ICryptoHelper } from "@/modules/core/auth/infrastructure/interfaces/crypto-helper.interface";
import { CRYPTO_HELPER } from "@/modules/core/auth/auth.tokens";
import { USER_REPOSITORY } from "@/modules/core/user/user.tokens";

@CommandHandler(CreateUserInputDTO)
export class CreateUserUseCase implements ICommandHandler<CreateUserInputDTO, UserResultDTO> {
    constructor(
        @Inject(USER_REPOSITORY) private readonly _repository: IUserRepository,
        @Inject(CRYPTO_HELPER) private readonly _cryptService: ICryptoHelper,
    ) {}

    private _createUserId(): string {
        return randomUUID();
    }

    public async execute(credentials: CreateUserInputDTO): Promise<UserResultDTO> {
        const existingUser = await this._repository.findByEmail(credentials.email);

        if (existingUser) {
          throw new AppError(
            409,
            "AUTH_ACCOUNT_ALREADY_EXISTS",
            "An account already exists for this email."
          );
        }
    
        const user = {
          _id: this._createUserId(),
          email: credentials.email,
          passwordHash: await this._cryptService.hashPassword(credentials.password),
        };

        const createdUser = await this._repository.create(user);

        if (!createdUser) {
            throw new AppError(
                500,
                "AUTH_ACCOUNT_CREATION_FAILED",
                "Failed to create user."
            );
        }

        return {
            id: createdUser._id,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
        };
    }
}
