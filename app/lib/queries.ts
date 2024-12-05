import { sql } from '@vercel/postgres';
import {
    Player,
    Tournament,
    Sport,
    Game,
    supportedSports,
    GamePlayer,
    RankRating
} from "./definitions"

export async function fetchRanks(sport_id: string) {
    try {
      const ranks = await sql<RankRating>`
        SELECT 
            players.name, 
            sports_players_map.rank,
            sports_players_map.rating
        FROM sports_players_map
        JOIN players ON sports_players_map.player_id = players.id
        WHERE sports_players_map.sport_id = ${sport_id}
        ORDER BY sports_players_map.rank DESC;
      `;
      return ranks.rows;
    } catch (error) {
      console.error("Error fetching ranks:", error);
      throw new Error("Failed to fetch ranks.");
    }
}

  
export async function fetchSport (sport_id: any) {
    try {
        const sport = await sql<Sport>`
          SELECT 
            id, 
            name, 
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
        const sport = await sql<Sport>`
          SELECT 
            name, 
            slug
          FROM sports
          ORDER BY name ASC
        `;
        return sport.rows;
    } catch (error) {
        console.error("Error fetching sport:", error);
        throw new Error("Failed to fetch sport data.");
    }
}

export async function fetchPrimarySports () {
    try {
        const sport = await sql<Sport>`
            SELECT
                name,
                slug
            FROM sports
            ORDER BY created_at ASC
            LIMIT 3
        `;
        return sport.rows;
    } catch (error) {
        console.error("Error fetching sports: ", error);
        throw new Error("Failed to fetch first 3 sports.");
    }
}

export async function fetchSecondarySports () {
    try {
        const sport = await sql<Sport>`
            SELECT
                name,
                slug
            FROM sports
            ORDER BY created_at ASC
            OFFSET 3
        `;
        return sport.rows;
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

export async function fetchTournamentsPerSport(sport: string) {
    if (!supportedSports.includes(sport)) {
        throw new Error (`${sport} is not a supported.`);
    }
    try {
        const tournaments = await sql<Tournament>`
        SELECT 
            tournaments.id AS id,
            sports.name AS sport,
            tournaments.name AS name,
            tournaments.start_date AS date
        FROM tournaments
        JOIN sports
        ON tournaments.sport_id = sports.id
        WHERE sports.name = ${sport};`;

        return tournaments.rows
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch ${sport} tournaments.`);
    }
}

export async function fetchRecentTournaments(sport: string) {
    if (!supportedSports.includes(sport)) {
        throw new Error (`${sport} is not a supported.`);
    }
    try {
        //grabs the most recent 3 tournaments and then 
        const tournaments = await sql<Tournament>`
        SELECT 
            tournaments.id AS id,
            sports.name AS sport,
            tournaments.name AS name,
            tournaments.start_date AS date
        FROM tournaments
        JOIN sports
        ON tournaments.sport_id = sports.id
        WHERE sports.name = ${sport}
        ORDER BY date DESC
        LIMIT 3;`;
        return tournaments.rows
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch ${sport} tournaments.`);
    }
}

export async function fetchCompletedStatus(tourney_name: string) {
    try {
        const data = await sql`
        SELECT tournaments.completed FROM tournaments
        WHERE tournaments.name = ${tourney_name}
        `;

        return data.rows[0].completed;
    } catch (error) {
        console.log("error", error);
    }
}

export async function fetchPlayer(name: string) {
    try {
        const data = await sql<Player>`
        SELECT * FROM players
        WHERE name LIKE ${name}
        `;
        return data.rows[0]
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

async function fetchTournamentId (tournament_name: string) {
    try {
        const data = await sql`
        SELECT tournaments.id FROM tournaments
        WHERE tournaments.name = ${tournament_name}
        `;
        return data.rows[0].id;
    } catch (error) {
        console.log("error", error);
    }

}

export async function insertNewMatch (
    p1_name: string,
    p2_name: string,
    p1_score: number,
    p2_score: number,
    sport: string,
    tournament: string,
) {
    if (!supportedSports.includes(sport)) {
        throw new Error (`${sport} is not a supported.`);
    }
    if (await fetchCompletedStatus(tournament)) {
        return {"message":"This tournament has been completed already"};
    }
    const p1 = await fetchPlayer(p1_name);
    const p2 = await fetchPlayer(p2_name);
    if (p1 == null) {
        console.log(`${p1_name} does not exist`);
        return ({"message": `${p1_name} does not exist, please register your account`})
    }
    if (p2 == null) {
        console.log(`${p2_name} does not exist`);
        return ({"message": `${p1_name} does not exist, please register your account`})

    }
    //TODO: calculate the rankings after each match input
    //TODO: check if the sport and tournament match
    //TODO: 
    try {
        const sport_id = supportedSports.indexOf(sport) + 1;
        const tourney_id = await fetchTournamentId(tournament);
        if (tourney_id == null) {
            return({"message": "tournament does not exist"})
        }
        const player1_id = p1.id
        const player2_id = p2.id
        await sql`
            INSERT INTO matches(sport_id, tournament_id, player1_id, player2_id, player1_score, player2_score)
            VALUES (${sport_id}, ${tourney_id}, ${player1_id}, ${player2_id}, ${p1_score}, ${p2_score})
        `;
        return {"message": "sucessfully added match to DB"}
    } catch (error) {
        console.log(error);
    }
}
