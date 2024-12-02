import {sql} from '@vercel/postgres';

// Define the function to update ratings
export const updateRatings = async (player1_id: string, player2_id: string, win: number, kFactor: number = 32) => {
    try {
        // Fetch current ratings for both players
        const result = await sql`
             SELECT id, rating
             FROM players
             WHERE id IN (${player1_id}, ${player2_id})`;


        if (result.rows.length < 2) {
            throw new Error('Could not find both players in the database');
        }

        // Extract player ratings
        let player1 = result.rows.find((p) => p.id === player1_id);
        let player2 = result.rows.find((p) => p.id === player2_id);

        if (!player1 || !player2) {
            throw new Error('Player IDs not found in the database');
        }

        let p1Rating: number = player1.rating;
        let p2Rating: number = player2.rating;

        // Calculate new ratings
        let Qa: number = 10 ** (p1Rating / 480);
        let Qb: number = 10 ** (p2Rating / 480);

        let Ea: number = Qa / (Qa + Qb);
        let Eb: number = Qb / (Qa + Qb);

        p1Rating = p1Rating + kFactor * (win - Ea);

        // Invert the win value for player 2
        let p2Win: number = win === 1 ? 0 : win === 0 ? 1 : 0.5; // Handle draw
        p2Rating = p2Rating + kFactor * (p2Win - Eb);

        // Update ratings in the database

        await sql`
            UPDATE players
            SET rating = $p1Rating
            WHERE id = $player1_id
            SET rating = $p2Rating
            WHERE id = $player2_id
        `;


        console.log(`Updated Player ${player1_id} to rating: ${p1Rating}`);
        console.log(`Updated Player ${player2_id} to rating: ${p2Rating}`);

        return [p1Rating, p2Rating];
    } catch (err) {
        console.error('Error updating player ratings:', err);
    }
};