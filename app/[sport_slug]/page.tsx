import { fetchSportSlug, fetchGames } from "@/app/lib/queries";
import GamesTable from '@/components/ui/games-table';
import { redirect } from "next/navigation";
import { getAuthPlayer } from '@/app/auth';

export default async function SportHome({params}: any) {
  const player = await getAuthPlayer();
  if (!player) {
    redirect("/signin");
  }
  const sport = await fetchSportSlug(params.sport_slug);
  const games = await fetchGames(sport.id);

  return (
    <div>
        <h5 className="text-center text-red-900 text-xl font-bold mb-3">
          {sport.name} Games
        </h5>
        <GamesTable games={games} />
    </div>
  );
}
