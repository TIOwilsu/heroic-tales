import {
  loadMongoConnectionConfig,
  MongoConfigurationError,
} from "./mongodb.config";

describe("loadMongoConnectionConfig", () => {
  it("loads the URI and database name without changing them", () => {
    expect(
      loadMongoConnectionConfig({
        MONGODB_URI: "mongodb://localhost:27017",
        MONGODB_DATABASE: "heroic_tales",
      }),
    ).toEqual({
      uri: "mongodb://localhost:27017",
      databaseName: "heroic_tales",
    });
  });

  it("accepts mongodb+srv URLs", () => {
    expect(
      loadMongoConnectionConfig({
        MONGODB_URI: "mongodb+srv://cluster.example.test",
        MONGODB_DATABASE: "heroic_tales",
      }).uri,
    ).toBe("mongodb+srv://cluster.example.test");
  });

  it("rejects missing or invalid connection settings without echoing secrets", () => {
    const secret = "mongodb://user:password@db.example.test";

    expect(() =>
      loadMongoConnectionConfig({
        MONGODB_URI: secret,
      }),
    ).toThrow(MongoConfigurationError);
    expect(() =>
      loadMongoConnectionConfig({
        MONGODB_URI: "https://db.example.test",
        MONGODB_DATABASE: "heroic_tales",
      }),
    ).toThrow(MongoConfigurationError);

    try {
      loadMongoConnectionConfig({ MONGODB_URI: secret });
    } catch (error) {
      expect(error).toBeInstanceOf(MongoConfigurationError);
      expect((error as Error).message).not.toContain(secret);
    }
  });
});
