import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().get("/api/hello", (c) =>
  c.json({ greeting: "Hello from Edge!" }),
);

export const GET = handle(app);
