import {sql} from '@vercel/postgres';
import { getPlayerRating } from '@/app/lib/queries';

// Function to update ratings
export default async function updateRatings (player1Id: number, player2Id: number, sport_id: number, score1: number, score2: number, kFactor: number = 32){
    //outcome = 1 if player1 wins, .5 if draw, and 0 if player2 wins.
    let outcome = 1;
    if (score1 == score2) {
        outcome = 0.5;
    } else if (score1 - score2 < 0) {
        outcome = 0;
    }

    try {
        let p1Rating = await getPlayerRating(player1Id, sport_id);
        let p2Rating = await getPlayerRating(player2Id, sport_id);

        // Calculate new ratings
        let Qa = 10 ** (p1Rating / 480);
        let Qb = 10 ** (p2Rating / 480);

        let Ea = Qa / (Qa + Qb);
        let Eb = Qb / (Qa + Qb);

        p1Rating = Math.round(p1Rating + kFactor * (outcome - Ea));
        p2Rating = Math.round(p2Rating + kFactor * ((1 - outcome) - Eb));

        // Update ratings in the database
        await sql`
            UPDATE sports_players_map
            SET rating = ${p1Rating}
            WHERE player_id = ${player1Id} AND sport_id = ${sport_id}
        `;
        await sql`
            UPDATE sports_players_map
            SET rating = ${p2Rating}
            WHERE player_id = ${player2Id} AND sport_id = ${sport_id}
        `

        return {
            p1Rating: p1Rating, 
            p2Rating: p2Rating
        };
    } catch (err) {
        console.error('Error updating player ratings:', err);
    }
};