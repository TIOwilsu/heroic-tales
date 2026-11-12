import { IQuery } from "@nestjs/cqrs";

export class GetUserInputDTO implements IQuery {
  constructor(public readonly userId: string) {}
}