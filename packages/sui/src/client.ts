import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";

export const networks = {
	testnet: { url: getFullnodeUrl("testnet") },
	mainnet: { url: getFullnodeUrl("mainnet") },
	devnet: { url: getFullnodeUrl("devnet") },
};

export type NetworkType = "testnet" | "mainnet" | "devnet";

export function createSuiClient(network: NetworkType = "testnet"): SuiClient {
	return new SuiClient({ url: networks[network].url });
}
