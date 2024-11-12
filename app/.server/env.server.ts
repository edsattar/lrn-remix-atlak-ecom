import chalk from "chalk";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  // PORT: z.string().min(1),
  // POSTHOG_API_KEY: z.string().min(1),
  // POSTHOG_API_ENDPOINT: z.string().min(1),
  // RESEND_API_KEY: z.string().min(1),
  // RESEND_AUDIENCE_ID: z.string().min(1),
});

let env: ReturnType<typeof initEnv>;

export const initEnv = () => {
  const envData = envSchema.safeParse(process.env);
  if (!envData.success) {
    const flatErrMsg = JSON.stringify(envData.error.flatten().fieldErrors);
    throw new Error(`Invalid environment variables ${flatErrMsg}`);
  }
  env = envData.data;

  console.log(chalk.green("Environment variables verified from .server/env.server.ts"));

  return envData.data;
};

export const getServerEnv = () => env;

export const getClientEnv = () => {
  const serverEnv = env;
  return {
    NODE_ENV: serverEnv.NODE_ENV,
  };
};

export type CLIENT_ENV = ReturnType<typeof getClientEnv>;
type APP_ENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends APP_ENV {}
  }
}
