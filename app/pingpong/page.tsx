import { title } from "@/components/primitives";
import { fetchTournamentsPerSport, fetchRecentTournaments } from "../lib/queries";

export default async function PingPongPage() {
  try {
    const tourneys = await fetchRecentTournaments("Ping Pong")
    console.log(`returned from the query: ${JSON.stringify(tourneys)}`)
  } catch (error) {
    console.log('Failed to fetch tounaments', error)
  }

  return (
    <div>
      <h1 className={title()}>Ping Pong</h1>
    </div>
  );
}
