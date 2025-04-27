"use client";

import { SuiWalletConnectButton } from "../components/SuiWalletConnectButton";

export default function Header() {
	return (
		<header className="w-full border-b">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				{/* Left side - Logo or title */}
				<div>{/* Add logo or title here if needed */}</div>

				{/* Right side - Auth buttons */}
				<div className="flex items-center gap-4">
					<SuiWalletConnectButton />
				</div>
			</div>
		</header>
	);
}
