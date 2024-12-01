import RanksTable from '@/components/ui/ranks-table';
import { getAuthPlayer } from '@/app/auth';
import { fetchRanks, fetchAllSports } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function Ranks() {
  const player = await getAuthPlayer();
  if (!player) {
    redirect("/login");
  }

  const sports = await fetchAllSports();
  const sportsWithGames = await Promise.all(
    sports.map(async (sport) => {
      const ranks = await fetchRanks(sport.id);
      return { sport, ranks };
    })
  );

  return (
    <div>
      {sportsWithGames.map(({ sport, ranks }) => (
        <div key={sport.id} className='mb-12'>
            <h5 className="text-center text-red-900 text-xl font-bold mb-3">
            {sport.name} Ranks
            </h5>
            <RanksTable ranks={ranks} />
        </div>
      ))}
    </div>
  );
}

