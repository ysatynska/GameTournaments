import {sql} from '@vercel/postgres';

// Define the function to update ratings
 const updateRatings = async (player1Id: number, player2Id: number, win: number, kFactor: number = 32) => {

    try {

        // Fetch current ratings for both players
        const result = await sql`
             SELECT id, rating
             FROM players
             WHERE id IN ($player1ID, $player2ID)`;


        if (result.rows.length < 2) {
            throw new Error('Could not find both players in the database');
        }

        // Extract player ratings
        let player1 = result.rows.find((p) => p.id === player1Id);
        let player2 = result.rows.find((p) => p.id === player2Id);

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
            WHERE id = $player1ID
            SET rating = $p2Rating
            WHERE id = $player2ID
        `;


        console.log(`Updated Player ${player1Id} to rating: ${p1Rating}`);
        console.log(`Updated Player ${player2Id} to rating: ${p2Rating}`);

        return [p1Rating, p2Rating];
    } catch (err) {
        console.error('Error updating player ratings:', err);
    }
};