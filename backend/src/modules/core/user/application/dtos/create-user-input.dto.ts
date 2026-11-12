import { ICommand } from "@nestjs/cqrs";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserInputDTO implements ICommand {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(12)
  public readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
