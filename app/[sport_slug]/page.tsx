import { fetchSportSlug, fetchGames } from "@/app/lib/queries";
import GamesTable from '@/components/ui/games-table';

export default async function SportHome({params}: any) {
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
