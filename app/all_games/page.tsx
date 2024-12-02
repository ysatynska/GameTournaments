import GamesTable from '@/components/ui/games-table';
import { getAuthPlayer } from '@/app/auth';
import { fetchGames, fetchSport, fetchAllSports } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function MyGames() {
  const player = await getAuthPlayer();

  if (!player) {
    redirect("/login");
  }

  const sports = await fetchAllSports();
  const sportsWithGames = await Promise.all(
    sports.map(async (sport) => {
      const games = await fetchGames(sport.id);
      return { sport, games };
    })
  );

  return (
    <div>
      {sportsWithGames.map(({ sport, games }) => (
        <div key={sport.id} className='mb-12'>
          {games.length > 0 && (
            <>
              <h5 className="text-center text-red-900 text-xl font-bold mb-3">
                {sport.name} Games
              </h5>
              <GamesTable games={games} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

