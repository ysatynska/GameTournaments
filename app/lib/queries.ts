import { sql } from '@vercel/postgres';
import {
    Player,
    Sport,
    GamePlayer,
    RankRating
} from "./definitions"

export async function fetchRatings(sport_id: string) {
    try {
      const ratings = await sql<RankRating>`
        SELECT 
            sports_players_map.player_id,
            players.name,
            sports_players_map.rating
        FROM sports_players_map
        JOIN players ON sports_players_map.player_id = players.id
        WHERE sports_players_map.sport_id = ${sport_id}
        ORDER BY sports_players_map.rating DESC;
      `;
      return ratings.rows;
    } catch (error) {
      console.error("Error fetching ratings:", error);
      throw new Error("Failed to fetch ratings.");
    }
}
  
export async function fetchSport (sport_id: any) {
    try {
        const sport = await sql<Sport>`
          SELECT 
            id, 
            name,
            slug,
            created_at 
          FROM sports
          WHERE id = ${sport_id}
        `;
        return sport.rows[0];
    } catch (error) {
        console.error("Error fetching sport:", error);
        throw new Error("Failed to fetch sport data.");
    }
}

export async function fetchSportSlug (sport_slug: any) {
    try {
        const sport = await sql<Sport>`
          SELECT 
            id, 
            name, 
            slug
          FROM sports
          WHERE slug = ${sport_slug}
        `;
        return sport.rows[0];
    } catch (error) {
        console.error("Error fetching sport:", error);
        throw new Error("Failed to fetch sport data.");
    }
}

export async function fetchAllSports () {
    try {
        const sports = await sql<Sport>`
            SELECT
                s.id,
                s.name
            FROM sports s
            LEFT JOIN games g ON s.id = g.sport_id
            GROUP BY s.id
            ORDER BY COALESCE(MAX(g.created_at), s.created_at) DESC
        `;
        return sports.rows;
    } catch (error) {
        console.error("Error fetching sport:", error);
        throw new Error("Failed to fetch sport data.");
    }
}

export async function fetchPrimarySports () {
    try {
        const sports = await sql<Sport>`
            SELECT
                s.name,
                s.slug,
                s.created_at,
                MAX(g.created_at)
            FROM sports s
            LEFT JOIN games g ON s.id = g.sport_id
            GROUP BY s.id
            ORDER BY COALESCE(MAX(g.created_at), s.created_at) DESC
            LIMIT 3
        `;
        return sports.rows;
    } catch (error) {
        console.error("Error fetching sports: ", error);
        throw new Error("Failed to fetch first 3 sports.");
    }
}

export async function fetchSecondarySports () {
    try {
        const sports = await sql<Sport>`
            SELECT
                s.name,
                s.slug
            FROM sports s
            LEFT JOIN games g ON s.id = g.sport_id
            GROUP BY s.id
            ORDER BY COALESCE(MAX(g.created_at), s.created_at) DESC
            OFFSET 3
        `;
        return sports.rows;
    } catch (error) {
        console.error("Error fetching sports: ", error);
        throw new Error("Failed to fetch remaining sports.");
    }
}

export async function fetchGames (sport_id: any, player_id?: any) {
    if (!sport_id) {
        throw new Error('Sport id is required.');
    }
    if (player_id) {
        try {
            const games = await sql<GamePlayer>`
                SELECT 
                games.id, 
                games.created_at, 
                games.player1_id, 
                games.player2_id, 
                games.score1, 
                games.score2, 
                p1.name AS player1_name, 
                p2.name AS player2_name
                FROM games
                LEFT JOIN players AS p1 ON games.player1_id = p1.id
                LEFT JOIN players AS p2 ON games.player2_id = p2.id
                WHERE games.sport_id = ${sport_id}
                AND (player1_id = ${player_id} OR player2_id = ${player_id})
                ORDER BY games.created_at DESC
            `;
            return games.rows;
        } catch (error) {
            console.error(error);
            throw new Error(`Database error fetching my games.`);
        }
    } else {
        try {
            const games = await sql<GamePlayer>`
              SELECT 
                games.id, 
                games.created_at, 
                games.player1_id, 
                games.player2_id, 
                games.score1, 
                games.score2,
                p1.name AS player1_name, 
                p2.name AS player2_name
              FROM games
              LEFT JOIN players AS p1 ON games.player1_id = p1.id
              LEFT JOIN players AS p2 ON games.player2_id = p2.id
              WHERE games.sport_id = ${sport_id}
              ORDER BY games.created_at DESC
            `;
            return games.rows;
          } catch (error) {
            console.error(error);
            throw new Error(`Database error fetching all games.`);
          }
    }
}

export async function fetchPlayer(id: any) {
    try {
        const data = await sql<Player>`
            SELECT * FROM players
            WHERE id = ${id}
        `;
        return data.rows[0];
    } catch (error) {
        console.log(error)
    }
}

export async function fetchPlayers() {
    try {
        const data = await sql<Player>`
            SELECT * FROM players
            ORDER BY name ASC
        `;
        return data.rows;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch all players.');
    }
}

export async function fetchSports() {
    try {
        const data = await sql<Sport>`
            SELECT * FROM sports
            ORDER BY name ASC
        `;
        return data.rows;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch all players.');
    }
}

export async function addToMap(player_id: any, sport_id: any){
    try{
        await sql`
            INSERT INTO sports_players_map(player_id, sport_id, rating)
            VALUES(${player_id}, ${sport_id}, 1000)
        `
    } catch (error) {
        console.error("Error instering new sport player map: ", error);
    }
}

export async function getPlayerRating (player_id: any, sport_id: any) {
    let player = await sql`
        SELECT player_id, rating
        FROM sports_players_map
        WHERE player_id = ${player_id} AND sport_id = ${sport_id}
    `
    if (player.rows.length === 0) {
        await addToMap(player_id, sport_id);
        player = await sql`
            SELECT player_id, rating
            FROM sports_players_map
            WHERE player_id = ${player_id} AND sport_id = ${sport_id}
        `
    }
    return player.rows[0].rating;
}

export async function createSubmitGameSession (player1_id: any, player2_id: any, score1: any, score2: any, increment1: any, increment2: any, rating1: any, rating2: any) {
    try{
        await sql`
            DELETE FROM submit_game_sessions
        `
        await sql`
            INSERT INTO submit_game_sessions(player1_id, player2_id, score1, score2, increment1, increment2, rating1, rating2)
            VALUES(${player1_id}, ${player2_id}, ${score1}, ${score2}, ${increment1}, ${increment2}, ${rating1}, ${rating2})
        `
    } catch (error) {
        console.error("Error instering new sport player map: ", error);
    }
}

export async function getSubmitGameSession () {
    try {
        const data = await sql`
            SELECT * FROM submit_game_sessions
            LIMIT 1;
        `;
        return data.rows[0];
    } catch (error) {
        console.log("error", error);
    }
}