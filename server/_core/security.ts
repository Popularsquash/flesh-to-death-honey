import type { NextFunction, Request, RequestHandler, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import helmet from "helmet";
import { body, validationResult } from "express-validator";

const ALLOWED_ORIGINS = new Set([
  "https://fleshtodeathhoney.com",
  "https://fleshtodeathhoney.manus.space",
]);

const sanitizeText = (value: string) =>
  value
    .trim()
    .replace(/\u0000/g, "")
    .replace(/[<>]/g, "");

const sanitizeEmail = (value: string) => value.trim().toLowerCase();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const unwrapTrpcPayload = (value: unknown): unknown => {
  if (!isRecord(value)) {
    return value;
  }

  if ("json" in value) {
    return unwrapTrpcPayload(value.json);
  }

  if ("input" in value) {
    return unwrapTrpcPayload(value.input);
  }

  const numericKeys = Object.keys(value)
    .filter(key => /^\d+$/.test(key))
    .sort((a, b) => Number(a) - Number(b));

  if (numericKeys.length > 0) {
    return unwrapTrpcPayload(value[numericKeys[0]]);
  }

  return value;
};

const getTrpcProcedureNames = (req: Request | any): string[] => {
  const path = req.path.replace(/^\//, "").trim();
  if (!path) {
    return [];
  }

  return path
    .split(",")
    .map((name: string) => name.trim())
    .filter(Boolean);
};

const getTrpcInputs = (req: Request | any): Array<Record<string, unknown> | undefined> => {
  const { body: requestBody } = req;

  if (Array.isArray(requestBody)) {
    return requestBody.map(item => {
      const payload = unwrapTrpcPayload(item);
      return isRecord(payload) ? payload : undefined;
    });
  }

  if (isRecord(requestBody)) {
    const numericKeys = Object.keys(requestBody)
      .filter(key => /^\d+$/.test(key))
      .sort((a, b) => Number(a) - Number(b));

    if (numericKeys.length > 0) {
      return numericKeys.map(key => {
        const payload = unwrapTrpcPayload(requestBody[key]);
        return isRecord(payload) ? payload : undefined;
      });
    }

    const payload = unwrapTrpcPayload(requestBody);
    return [isRecord(payload) ? payload : undefined];
  }

  return [];
};

const sanitizeStringField = (
  input: Record<string, unknown> | undefined,
  field: string,
  sanitizer: (value: string) => string = sanitizeText,
) => {
  if (!input) {
    return;
  }

  const value = input[field];
  if (typeof value === "string") {
    input[field] = sanitizer(value);
  }
};

const applySanitizers = (procedureName: string, input: Record<string, unknown> | undefined) => {
  switch (procedureName) {
    case "contact.send":
      sanitizeStringField(input, "name");
      sanitizeStringField(input, "email", sanitizeEmail);
      sanitizeStringField(input, "message");
      break;
    case "email.subscribe":
      sanitizeStringField(input, "email", sanitizeEmail);
      sanitizeStringField(input, "interest");
      break;
    case "email.unsubscribe":
      sanitizeStringField(input, "email", sanitizeEmail);
      break;
    case "reviews.add":
      sanitizeStringField(input, "reviewerName");
      sanitizeStringField(input, "title");
      sanitizeStringField(input, "content");
      break;
    case "checkout.createSession":
      sanitizeStringField(input, "sessionId", value => value.trim());
      break;
    default:
      break;
  }
};

const ensureStringLength = (
  value: unknown,
  fieldName: string,
  min: number,
  max: number,
) => {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }

  const length = value.length;
  if (length < min || length > max) {
    throw new Error(`${fieldName} must be between ${min} and ${max} characters`);
  }
};

const ensureOptionalStringLength = (
  value: unknown,
  fieldName: string,
  min: number,
  max: number,
) => {
  if (value === undefined) {
    return;
  }

  ensureStringLength(value, fieldName, min, max);
};

const ensureEmail = (value: unknown, fieldName: string) => {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }

  const email = value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error(`${fieldName} must be a valid email address`);
  }
};

const ensureNumberInRange = (
  value: unknown,
  fieldName: string,
  min: number,
  max: number,
) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${fieldName} must be a number`);
  }

  if (value < min || value > max) {
    throw new Error(`${fieldName} must be between ${min} and ${max}`);
  }
};

const validateProcedureInput = (procedureName: string, input: Record<string, unknown> | undefined) => {
  switch (procedureName) {
    case "contact.send":
      if (!input) throw new Error("contact.send payload is required");
      ensureStringLength(input.name, "name", 1, 100);
      ensureEmail(input.email, "email");
      ensureStringLength(input.message, "message", 1, 2000);
      break;
    case "email.subscribe":
      if (!input) throw new Error("email.subscribe payload is required");
      ensureEmail(input.email, "email");
      ensureOptionalStringLength(input.interest, "interest", 0, 200);
      break;
    case "email.unsubscribe":
      if (!input) throw new Error("email.unsubscribe payload is required");
      ensureEmail(input.email, "email");
      break;
    case "reviews.add":
      if (!input) throw new Error("reviews.add payload is required");
      ensureNumberInRange(input.productId, "productId", 1, Number.MAX_SAFE_INTEGER);
      ensureStringLength(input.reviewerName, "reviewerName", 1, 100);
      ensureNumberInRange(input.rating, "rating", 1, 5);
      ensureOptionalStringLength(input.title, "title", 0, 255);
      ensureOptionalStringLength(input.content, "content", 0, 2000);
      break;
    case "checkout.createSession":
      if (!input) {
        return;
      }
      ensureOptionalStringLength(input.sessionId, "sessionId", 1, 255);
      break;
    default:
      break;
  }
};

const handleValidationErrors: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  res.status(400).json({
    error: "Invalid request payload",
    details: errors.array().map(error => error.msg),
  });
};

export const helmetMiddleware = helmet({
  crossOriginResourcePolicy: false,
});

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  optionsSuccessStatus: 204,
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: req => req.path === "/stripe/webhook",
  message: {
    error: "Too many requests, please try again later.",
  },
});

export const hppProtection = hpp();

export const trpcInputValidation: RequestHandler[] = [
  body().customSanitizer((value, { req }) => {
    const procedures = getTrpcProcedureNames(req);
    const inputs = getTrpcInputs(req);

    procedures.forEach((procedureName, index) => {
      applySanitizers(procedureName, inputs[index]);
    });

    return value;
  }),
  body().custom((_, { req }) => {
    const procedures = getTrpcProcedureNames(req);
    const inputs = getTrpcInputs(req);

    procedures.forEach((procedureName, index) => {
      validateProcedureInput(procedureName, inputs[index]);
    });

    return true;
  }),
  handleValidationErrors,
];

export const allowedOrigins = Array.from(ALLOWED_ORIGINS);
