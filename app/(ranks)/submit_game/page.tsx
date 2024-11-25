// pages/submit-score.js
import { fetchPlayers, fetchSports } from '@/app/lib/queries';
import Form from '@/components/ui/submit_game/submit-form';

export default async function SubmitScore() {
    const players = await fetchPlayers();
    const sports = await fetchSports();
  return (
      <Form players={players} sports={sports}/>
  );
}
