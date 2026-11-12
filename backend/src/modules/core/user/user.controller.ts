import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserInputDTO } from "@/modules/core/user/application/dtos/create-user-input.dto";
import { GetUserInputDTO } from "@/modules/core/user/application/dtos/get-user-input.dto";
import type { UserResultDTO } from "@/modules/core/user/domain/dtos/user-result.dto";
import { AuthTokenGuard } from "@/modules/core/auth/adapters/http/guards/auth-token.guard";

@Controller("users")
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  public async create(
    @Body() input: CreateUserInputDTO,
  ): Promise<UserResultDTO> {
    return this._commandBus.execute<CreateUserInputDTO, UserResultDTO>(input);
  }

  @Get(":userId")
  @UseGuards(AuthTokenGuard)
  public async findById(
    @Param("userId") userId: string,
  ): Promise<UserResultDTO> {
    return this._queryBus.execute<GetUserInputDTO, UserResultDTO>(
      new GetUserInputDTO(userId),
    );
  }
}
