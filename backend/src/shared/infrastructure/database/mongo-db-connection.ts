import { MongoClient, type Db } from "mongodb";
import type { MongoConnectionConfig } from "./mongo-db-config";

export type MongoClientLike = Pick<MongoClient, "connect" | "close" | "db">;
export type MongoClientFactory = (uri: string) => MongoClientLike;

export class MongoDbConnection {
  private _client: MongoClientLike | undefined;
  private _database: Db | undefined;

  constructor(
    private readonly _config: MongoConnectionConfig,
    private readonly _createClient: MongoClientFactory = (uri) =>
      new MongoClient(uri),
  ) {}

  async connect(): Promise<void> {
    if (this._client) {
      return;
    }

    const client = this._createClient(this._config.uri);
    await client.connect();
    this._client = client;
    this._database = client.db(this._config.databaseName);
  }

  async ping(): Promise<boolean> {
    if (!this._database) {
      throw new Error("MongoDB connection must be established before pinging.");
    }

    await this._database.command({ ping: 1 });
    return true;
  }

  async close(): Promise<void> {
    if (!this._client) {
      return;
    }

    await this._client.close();
    this._client = undefined;
    this._database = undefined;
  }
}
