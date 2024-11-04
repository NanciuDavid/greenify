import Leaderboard from "@/components/leaderboard/leaderboard";
import { createClient } from "@/utils/supabase/server";

// import userData from "@/data/leaderboard.json";

export default async function LeaderboardPage() {
  const supabase = createClient();

  const { data } = await (await supabase).from("recyclers").select("*");

  console.log(data);
  return (
    <div>
      <Leaderboard records={data}></Leaderboard>
    </div>
  );
}
