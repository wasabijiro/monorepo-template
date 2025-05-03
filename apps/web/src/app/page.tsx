import LWCChart from "@/components/LWCChart";
import BattleClock from "@/components/BattleClock";

export default function Home() {
	return (
		<div>
			<BattleClock
				totalSeconds={15}
				challengeSeconds={5}
			/>
			<LWCChart />
		</div>
	);
}
