import LWCChart from "@/components/LWCChart";
import BattleClock from "@/components/BattleClock";
import { CoinList } from "@/components/CoinList";
import { ChampionCoinList } from "@/components/ChampionCoinList";

export default function Home() {
	return (
		<div>
			<BattleClock
				totalSeconds={15}
				challengeSeconds={5}
			/>
			<ChampionCoinList />
      <CoinList />
			{/* <LWCChart /> */}
		</div>
	);
}
