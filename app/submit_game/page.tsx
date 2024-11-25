// pages/submit-score.js
import { fetchPlayers } from '@/app/lib/queries';
import Form from '@/components/ui/submit_game/submit-form';

export default async function SubmitScore() {
    const players = await fetchPlayers();
  return (
      <Form players={players} />
  );
}
