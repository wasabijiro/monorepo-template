import type { SuiClient } from "@mysten/sui/client";
import { logger } from "@workspace/logger";
import { SUI_BASE_UNIT, SUI_TYPE } from "./constants";

/**
 * Get SUI balance for a wallet address
 * @param suiClient - SUI client instance
 * @param address - Wallet address
 * @returns Formatted balance string with 3 decimal places
 */
export async function getSuiBalance(
	suiClient: SuiClient,
	address: string,
): Promise<string> {
	try {
		const { totalBalance } = await suiClient.getBalance({
			owner: address,
			coinType: SUI_TYPE,
		});
		// Format balance
		return formatSuiBalance(totalBalance);
	} catch (error) {
		logger.error("[Sui] Failed to fetch SUI balance", { error });
		return "Error";
	}
}

/**
 * Format SUI balance from base units to display format
 * @param balance - Balance in base units
 * @returns Formatted balance string with 3 decimal places
 */
export function formatSuiBalance(balance: bigint | string): string {
	return (Number(balance) / SUI_BASE_UNIT).toFixed(3);
}
