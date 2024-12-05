import { fetchPlayers, fetchSportSlug } from '@/app/lib/queries';
import Form from '@/components/ui/submit_game/submit-form';
import { getAuthPlayer } from '@/app/auth';
import { redirect } from "next/navigation";

export default async function SubmitScore({params}: any) {
  const player = await getAuthPlayer();
  const sport = await fetchSportSlug(params.sport_slug);

  if (!player) {
    redirect("/login");
  }
  const players = await fetchPlayers();
  return (
    <Form players={players} sport={sport}/>
  );
}
