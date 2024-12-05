import GamesTable from '@/components/ui/games-table';
import { getAuthPlayer } from '@/app/auth';
import { fetchGames, fetchSportSlug } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function MyGames({params}: any) {
  const player = await getAuthPlayer();
  if (!player) {
    redirect("/login");
  }
  const sport = await fetchSportSlug(params.sport_slug);
  const games = await fetchGames(sport.id, player.id);

  return (
    <div>
      <h5 className="text-center text-red-900 text-xl font-bold mb-3">
        My {sport.name} Games
      </h5>
      <GamesTable games={games} />
    </div>
  );
}

