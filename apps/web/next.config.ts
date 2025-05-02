import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

// TypeScriptでasyncなTop-level awaitを使うための関数
const defineConfig = async (): Promise<NextConfig> => {
	const config: NextConfig = {
		/* config options here */
		output: "standalone",
	};

	if (process.env.NODE_ENV === "development") {
		await setupDevPlatform();
	}

	return config;
};

export default defineConfig();
