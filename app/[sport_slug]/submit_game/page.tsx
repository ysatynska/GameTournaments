import { fetchPlayers, fetchSportSlug } from '@/app/lib/queries';
import Form from '@/components/ui/submit_game/submit-form';
import { getAuthPlayer } from '@/app/auth';
import { redirect } from "next/navigation";

export default async function SubmitScore({params}: any) {
  const player = await getAuthPlayer();
  const sport = await fetchSportSlug(params.sport_slug);

  if (!player) {
    redirect("/signin");
  }
  const players = await fetchPlayers();
  return (
    <main className="flex items-center justify-center h-[calc(100vh-10rem)]">
    <Form players={players} sport={sport}/>
    </main>
  );
}
