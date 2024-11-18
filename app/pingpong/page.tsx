import { title } from "@/components/primitives";
import { fetchTournamentsPerSport, fetchRecentTournaments, fetchCompletedStatus, insertNewMatch } from "../lib/queries";

export default async function PingPongPage() {
  try {
    const response = await insertNewMatch("dylan noell", "ryan pettes", 21, 0, "Ping Pong", "open tournament");
    console.log(`returned from the query: ${JSON.stringify(response)}`)
  } catch (error) {
    console.log('Failed to fetch tounaments', error)
  }

  return (
    <div>
      <h1 className={title()}>Ping Pong</h1>
    </div>
  );
}
