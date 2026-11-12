import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDbModule } from "@/shared/application/mongo-db.module";
import { UserRepository } from "@/modules/core/user/infrastructure/repositories/user.repository";
import { UserDocument, UserSchema } from "@/modules/core/user/infrastructure/schemas/user.schema";
import { CreateUserUseCase } from "@/modules/core/user/application/usecases/create-user.usecase";
import { GetUserUseCase } from "@/modules/core/user/application/usecases/get-user.usecase";
import { CREATE_USER_USECASE, GET_USER_USECASE, USER_REPOSITORY } from "@/modules/core/user/user.tokens";
import { UserController } from "@/modules/core/user/user.controller";
import { CryptoHelper } from "@/modules/core/auth/infrastructure/helpers/crypto.helper";
import { CRYPTO_HELPER } from "@/modules/core/auth/auth.tokens";
import { AuthTokenGuard } from "@/modules/core/auth/adapters/http/guards/auth-token.guard";

@Module({
  imports: [
    CqrsModule,
    MongoDbModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: CREATE_USER_USECASE, useClass: CreateUserUseCase },
    { provide: GET_USER_USECASE, useClass: GetUserUseCase },
    { provide: CRYPTO_HELPER, useClass: CryptoHelper },
    AuthTokenGuard,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
