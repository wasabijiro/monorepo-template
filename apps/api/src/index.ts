import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

app.get("/hello", (c) => c.json({ greeting: "Hello Worker!" }));

app.post("/echo", zValidator("json", z.object({ msg: z.string() })), (c) =>
  c.json({ echoed: c.req.valid("json").msg }),
);

export default app;
