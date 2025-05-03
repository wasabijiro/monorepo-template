"use client";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { networks } from "@workspace/sui";
import { useState } from "react";
import "@mysten/dapp-kit/dist/index.css";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" attribute="class" enableColorScheme={false}>
				<SuiClientProvider networks={networks} defaultNetwork="testnet">
					<WalletProvider>{children}</WalletProvider>
				</SuiClientProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
