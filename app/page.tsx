import RanksTable from '@/components/ui/ranks-table';
import { getAuthPlayer } from '@/app/auth';
import { fetchRatings, fetchAllSports } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const player = await getAuthPlayer();

  if (!player) {
    redirect("/signin");
  }

  const sports = await fetchAllSports();
  const sportsWithGames = await Promise.all(
    sports.map(async (sport) => {
      const ranks = await fetchRatings(sport.id);
      return { sport, ranks };
    })
  );

  return (
    <div>
      {sportsWithGames.map(({ sport, ranks }) => (
        <div key={sport.id} className='mb-12'>
          {ranks.length > 0 && (
            <>
              <h5 className="text-center text-red-900 text-xl font-bold mb-3">
                {sport.name} Ranks
              </h5>
              <RanksTable ranks={ranks} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}