"use client";

import { SuiWalletConnectButton } from "../components/SuiWalletConnectButton";
import Image from "next/image";

export default function Header() {
	return (
		<header className="w-full border-b">
			<div className="container mx-auto px-4 h-24 flex items-center justify-between">
				{/* Left side - Logo or title */}
				<div className="flex items-center gap-3">
					<Image
						src="/icon.png"
						alt="Ooze.fun Logo"
						width={120}
						height={120}
						className="h-20 w-auto"
					/>
					<span className="text-2xl font-bold text-pink-500">ooze.fun</span>
				</div>

				{/* Right side - Auth buttons */}
				<div className="flex items-center gap-4">
					<SuiWalletConnectButton />
				</div>
			</div>
		</header>
	);
}
