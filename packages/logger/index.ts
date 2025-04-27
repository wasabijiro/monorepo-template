export * from "./src/types";
export * from "./src/console";

import { createConsoleLogger } from "./src/console";
export const logger = createConsoleLogger();
