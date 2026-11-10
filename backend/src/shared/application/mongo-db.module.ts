import { Module } from "@nestjs/common";
import { MongoDbConnection } from "../infrastructure/database/mongo-db-connection";
import { loadMongoConnectionConfig } from "../infrastructure/database/mongo-db-config";

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
