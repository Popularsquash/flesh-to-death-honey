type NodeEnv = "development" | "test" | "production";

type EnvShape = {
  nodeEnv: NodeEnv;
  isProduction: boolean;
  port?: number;
  appId: string;
  cookieSecret: string;
  databaseUrl?: string;
  oAuthServerUrl: string;
  ownerOpenId?: string;
  forgeApiUrl?: string;
  forgeApiKey?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  printfulApiKey?: string;
};

const readString = (key: string): string | undefined => {
  const value = process.env[key];
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const readUrl = (key: string, required: boolean): string | undefined => {
  const value = readString(key);
  if (!value) {
    if (required) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return undefined;
  }

  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`Environment variable ${key} must be a valid URL`);
  }
};

const readPort = (): number | undefined => {
  const value = readString("PORT");
  if (!value) {
    return undefined;
  }

  const port = Number.parseInt(value, 10);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("Environment variable PORT must be a valid port number");
  }

  return port;
};

const readNodeEnv = (): NodeEnv => {
  const value = readString("NODE_ENV") ?? "development";
  if (value === "development" || value === "test" || value === "production") {
    return value;
  }

  throw new Error("Environment variable NODE_ENV must be development, test, or production");
};

const requireIfProduction = (key: string, production: boolean): string | undefined => {
  const value = readString(key);
  if (!value && production) {
    throw new Error(`Missing required environment variable in production: ${key}`);
  }
  return value;
};

const buildEnv = (): EnvShape => {
  const nodeEnv = readNodeEnv();
  const isProduction = nodeEnv === "production";

  const appId = readString("VITE_APP_ID");
  if (!appId) {
    throw new Error("Missing required environment variable: VITE_APP_ID");
  }

  const cookieSecret = readString("JWT_SECRET");
  if (!cookieSecret) {
    throw new Error("Missing required environment variable: JWT_SECRET");
  }

  const oAuthServerUrl = readUrl("OAUTH_SERVER_URL", true);
  if (!oAuthServerUrl) {
    throw new Error("Missing required environment variable: OAUTH_SERVER_URL");
  }

  return {
    nodeEnv,
    isProduction,
    port: readPort(),
    appId,
    cookieSecret,
    databaseUrl: requireIfProduction("DATABASE_URL", isProduction),
    oAuthServerUrl,
    ownerOpenId: readString("OWNER_OPEN_ID"),
    forgeApiUrl: readUrl("BUILT_IN_FORGE_API_URL", false),
    forgeApiKey: readString("BUILT_IN_FORGE_API_KEY"),
    stripeSecretKey: requireIfProduction("STRIPE_SECRET_KEY", isProduction),
    stripeWebhookSecret: requireIfProduction("STRIPE_WEBHOOK_SECRET", false),
    printfulApiKey: requireIfProduction("PRINTFUL_API_KEY", isProduction),
  };
};

export const ENV = buildEnv();
