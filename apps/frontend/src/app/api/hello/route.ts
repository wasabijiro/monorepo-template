import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().get("/", (c) =>
	c.json({ greeting: "Hello from Edge!" }),
);
export const GET = handle(app); // App Router 用エンドポイント化
