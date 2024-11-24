import { title } from "@/components/primitives";
import { fetchTournamentsPerSport, fetchRecentTournaments, fetchCompletedStatus, insertNewMatch } from "../lib/queries";

export default async function PingPongPage() {

  return (
    <div>
      <h1 className={title()}>Ping Pong</h1>
    </div>
  );
}
