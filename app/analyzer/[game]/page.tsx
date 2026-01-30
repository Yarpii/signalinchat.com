import { GAME_PROFILES } from "@/lib/gameProfiles";
import GameAnalyzerPage from "./GameAnalyzer";

export function generateStaticParams() {
  return Object.keys(GAME_PROFILES).map((game) => ({ game }));
}

export default function Page() {
  return <GameAnalyzerPage />;
}
