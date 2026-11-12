import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDbConnection } from "../infrastructure/database/mongo-db-connection";
import { loadMongoConnectionConfig } from "../infrastructure/database/mongo-db-config";

export const MONGODB_CONNECTION = Symbol("MONGODB_CONNECTION");

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const config = loadMongoConnectionConfig();
        return { uri: config.uri, dbName: config.databaseName };
      },
    }),
  ],
  providers: [
    {
      provide: MONGODB_CONNECTION,
      useFactory: () => new MongoDbConnection(loadMongoConnectionConfig()),
    },
  ],
  exports: [MONGODB_CONNECTION, MongooseModule],
})
export class MongoDbModule {}
