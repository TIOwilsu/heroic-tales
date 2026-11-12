import { CreateUserInputDTO } from "@/modules/core/user/infrastructure/dtos/create-user-input.dto";
import { User } from "@/modules/core/user/domain/entities/user.entity";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(user: CreateUserInputDTO): Promise<User>;
}
