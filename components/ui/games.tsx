import { GamePlayer } from '@/app/lib/definitions';
import { fetchGames } from '@/app/lib/queries'

export default async function GamesTable ({sport_id, player_id}: {sport_id:any, player_id:any}) {
    const games = await fetchGames(sport_id, player_id);
    if (games.length === 0) {
      return <p>No games found.</p>;
    }
  
    return (
      <div>
        <h1>Games</h1>
        <table>
        <thead>
          <tr>
            <th>Date Submitted</th>
            <th>Player 1 Name</th>
            <th>Player 2 Name</th>
            <th>Player 1 Score</th>
            <th>Player 2 Score</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{new Date(game.created_at).toLocaleDateString()}</td>
              <td>{game.player1_id}</td>
              <td>{game.player2_id}</td>
              <td>{game.score1}</td>
              <td>{game.score2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };
  