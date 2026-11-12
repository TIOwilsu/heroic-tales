import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AccessTokenInputDTO } from "@/modules/core/auth/application/dtos/access-token-input.dto";
import { AuthTokenResultDTO } from "@/modules/core/auth/application/dtos/auth-token-result.dto";
import { RefreshTokenInputDTO } from "@/modules/core/auth/application/dtos/refresh-token-input.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Post("access-token")
  public async login(
    @Body() input: AccessTokenInputDTO,
  ): Promise<AuthTokenResultDTO> {
    return this._commandBus.execute<AccessTokenInputDTO, AuthTokenResultDTO>(input);
  }

  @Post("refresh-token")
  public async refreshToken(
    @Body() input: RefreshTokenInputDTO,
  ): Promise<AuthTokenResultDTO> {
    return this._commandBus.execute<RefreshTokenInputDTO, AuthTokenResultDTO>(input);
  }
}
