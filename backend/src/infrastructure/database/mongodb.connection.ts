import { MongoClient, type Db } from "mongodb";
import type { MongoConnectionConfig } from "./mongodb.config";

export type MongoClientLike = Pick<MongoClient, "connect" | "close" | "db">;
export type MongoClientFactory = (uri: string) => MongoClientLike;

export class MongoDbConnection {
  private client: MongoClientLike | undefined;
  private database: Db | undefined;

  constructor(
    private readonly config: MongoConnectionConfig,
    private readonly createClient: MongoClientFactory = (uri) =>
      new MongoClient(uri),
  ) {}

  async connect(): Promise<void> {
    if (this.client) {
      return;
    }

    const client = this.createClient(this.config.uri);
    await client.connect();
    this.client = client;
    this.database = client.db(this.config.databaseName);
  }

  async ping(): Promise<boolean> {
    if (!this.database) {
      throw new Error("MongoDB connection must be established before pinging.");
    }

    await this.database.command({ ping: 1 });
    return true;
  }

  async close(): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client.close();
    this.client = undefined;
    this.database = undefined;
  }
}
