import RanksTable from '@/components/ui/ranks-table';
import { getAuthPlayer } from '@/app/auth';
import { fetchRatings, fetchSportSlug } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function Ranks({params}: any) {
  const player = await getAuthPlayer();
  if (!player) {
    redirect("/login");
  }
  const sport = await fetchSportSlug(params.sport_slug);
  const ranks = await fetchRatings(sport.id);
  
  return (
    <div className='mb-12'>
      <h5 className="text-center text-red-900 text-xl font-bold mb-3">
      {sport.name} Ranks
      </h5>
      <RanksTable ranks={ranks} />
    </div>
  );
}

