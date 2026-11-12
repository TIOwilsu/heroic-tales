import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRepository } from "@/modules/core/user/infrastructure/interfaces/user-repository.interface";
import { UserDocument } from "@/modules/core/user/infrastructure/schemas/user.schema";
import { CreateUserInputDTO } from "@/modules/core/user/infrastructure/dtos/create-user-input.dto";
import { User } from "@/modules/core/user/domain/entities/user.entity";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _model: Model<UserDocument>,
  ) {}

  public async findByEmail(email: string): Promise<User | undefined> {
    const document = await this._model
      .findOne({ email })
      .select("+passwordHash")
      .lean()
      .exec();

    return document ? this._toUser(document) : undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    const document = await this._model
      .findById(id)
      .select("+passwordHash")
      .lean()
      .exec();

    return document ? this._toUser(document) : undefined;
  }

  public async create(user: CreateUserInputDTO): Promise<User> {
    const document = await this._model.create(user);
    return this._toUser({ ...document });
  }

  private _toUser(document: Record<string, unknown>): User {
    return {
      _id: String(document._id),
      email: String(document.email),
      passwordHash: String(document.passwordHash),
      createdAt: new Date(document.createdAt as string),
    };
  }
}
