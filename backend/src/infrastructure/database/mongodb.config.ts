export interface MongoConnectionConfig {
  readonly uri: string;
  readonly databaseName: string;
}

export class MongoConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MongoConfigurationError";
  }
}

export function loadMongoConnectionConfig(
  environment: NodeJS.ProcessEnv = process.env,
): MongoConnectionConfig {
  const uri = environment.MONGODB_URI?.trim();
  const databaseName = environment.MONGODB_DATABASE?.trim();

  if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) {
    throw new MongoConfigurationError(
      "MONGODB_URI must use the mongodb:// or mongodb+srv:// scheme.",
    );
  }

  if (!databaseName) {
    throw new MongoConfigurationError(
      "MONGODB_DATABASE must be provided for the application database.",
    );
  }

  return { uri, databaseName };
}
