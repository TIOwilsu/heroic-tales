import { Module } from "@nestjs/common";
import { MongoDbConnection } from "./mongodb.connection";
import { loadMongoConnectionConfig } from "./mongodb.config";

export const MONGODB_CONNECTION = Symbol("MONGODB_CONNECTION");

@Module({
  providers: [
    {
      provide: MONGODB_CONNECTION,
      useFactory: () => new MongoDbConnection(loadMongoConnectionConfig()),
    },
  ],
  exports: [MONGODB_CONNECTION],
})
export class MongoDbModule {}
