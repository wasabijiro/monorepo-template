import LWCChart from "@/components/LWCChart";
import BattleClock from "@/components/BattleClock";
import { CoinList } from "@/components/CoinList";

export default function Home() {
	return (
		<div>
			<BattleClock
				totalSeconds={15}
				challengeSeconds={5}
			/>
      <CoinList />
			{/* <LWCChart /> */}
		</div>
	);
}
