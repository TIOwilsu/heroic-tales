import { ICommand } from "@nestjs/cqrs";
import { IsString, MinLength } from "class-validator";

export class RefreshTokenInputDTO implements ICommand {
  @IsString()
  @MinLength(1)
  public readonly refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
