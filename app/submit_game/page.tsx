import { fetchPlayers, fetchSports } from '@/app/lib/queries';
import Form from '@/components/ui/submit_game/submit-form';
import { getAuthPlayer } from '@/app/auth';
import { redirect } from "next/navigation";

export default async function SubmitScore() {
  const player = await getAuthPlayer();

  if (!player) {
    redirect("/login");
  }
  const players = await fetchPlayers();
  const sports = await fetchSports();
  return (
    <Form players={players} sports={sports}/>
  );
}
