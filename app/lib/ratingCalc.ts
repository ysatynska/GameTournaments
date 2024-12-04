import {sql} from '@vercel/postgres';
import { addToMap } from './queries';

// Define the function to update ratings
    async function updateRatings (player1Id: number, player2Id: number, sport_id: number, outcome: number, kFactor: number = 32){
    try {

        // Fetch current ratings for both players
        const result = await sql`
             SELECT player_id, rating
             FROM sports_players_map
             WHERE id IN (${player1Id}, ${player2Id}) AND sport_id = ${sport_id}`;


        if (result.rows.length < 2) {
            throw new Error('Could not find both players in the database');
        }

        // Extract player ratings
        let player1 = result.rows.find((p) => p.id === player1Id);
        let player2 = result.rows.find((p) => p.id === player2Id);

        if (!player1 || !player2) {
            throw new Error('Player IDs not found in the database');
        }

        addToMap(player1Id, sport_id);
        addToMap(player2Id, sport_id);

        let p1Rating: number = player1.rating;
        let p2Rating: number = player2.rating;

        // Calculate new ratings
        let Qa: number = 10 ** (p1Rating / 480);
        let Qb: number = 10 ** (p2Rating / 480);

        let Ea: number = Qa / (Qa + Qb);
        let Eb: number = Qb / (Qa + Qb);

        p1Rating = p1Rating + kFactor * (outcome - Ea);
        p2Rating = p2Rating + kFactor * ((1 - outcome) - Eb);

        // Update ratings in the database

        await sql`
            UPDATE sports_players_map
            SET rating = ${p1Rating}
            WHERE id = ${player1Id} AND sport_id = ${sport_id}
        `;
        await sql`
            UPDATE sports_players_map
            SET rating = ${p2Rating}
            WHERE id = ${player2Id} AND sport_id = ${sport_id}
        `


        console.log(`Updated Player ${player1Id} to rating: ${p1Rating}`);
        console.log(`Updated Player ${player2Id} to rating: ${p2Rating}`);

        return [p1Rating, p2Rating];
    } catch (err) {
        console.error('Error updating player ratings:', err);
    }
};

export default updateRatings;