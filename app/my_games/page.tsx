'use client'
import { useSearchParams } from 'next/navigation';
import GamesTable from '@/components/ui/games';
import { Suspense } from 'react';

export default function MyGames () {
  const searchParams = useSearchParams();
  const player_id = searchParams.get('player_id');
  const sport_id = searchParams.get('sport_id');

  return (
    <Suspense fallback={<p>Loading games...</p>}>
      <GamesTable player_id={player_id} sport_id={sport_id}/>
    </Suspense>
  );
};
