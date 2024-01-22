// app/environment.server.ts
import * as z from "zod";

// abordagem https://dev.to/remix-run-br/type-safe-environment-variables-on-both-client-and-server-with-remix-54l5

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SESSION_SECRET: z.string().min(1),
  API_HOST: z.string().min(1),
  BASE_URL: z.string().min(1),
  GITHUB_ID: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  GITHUB_CALLBACK_URL: z.string().min(1),
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string().min(1),
  DISCORD_APP_CLIENT_ID: z.string().min(1),
  DISCORD_APP_SECRET: z.string().min(1),
  MSW_RUNNING: z.string().default("false"),
});

const environment = () => environmentSchema.parse(process.env);

export { environment };
