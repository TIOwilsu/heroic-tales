import { MongoDbConnection, type MongoClientLike } from "./mongo-db-connection";

describe("MongoDbConnection", () => {
  it("connects to the configured database and verifies it with ping", async () => {
    const command = jest.fn().mockResolvedValue({ ok: 1 });
    const database = { command };
    const client: MongoClientLike = {
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
      db: jest.fn().mockReturnValue(database),
    } as unknown as MongoClientLike;
    const createClient = jest.fn().mockReturnValue(client);
    const connection = new MongoDbConnection(
      { uri: "mongodb://localhost:27017", databaseName: "heroic_tales" },
      createClient,
    );

    await connection.connect();
    await expect(connection.ping()).resolves.toBe(true);
    await connection.close();

    expect(createClient).toHaveBeenCalledWith("mongodb://localhost:27017");
    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.db).toHaveBeenCalledWith("heroic_tales");
    expect(command).toHaveBeenCalledWith({ ping: 1 });
    expect(client.close).toHaveBeenCalledTimes(1);
  });

  it("requires connect before ping", async () => {
    const connection = new MongoDbConnection({
      uri: "mongodb://localhost:27017",
      databaseName: "heroic_tales",
    });

    await expect(connection.ping()).rejects.toThrow(
      "MongoDB connection must be established before pinging.",
    );
  });
});
