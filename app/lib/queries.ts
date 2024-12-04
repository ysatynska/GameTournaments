import { sql } from '@vercel/postgres';
import {
    Player,
    Tournament,
    Sport,
    Match,
    supportedSports,
} from "./definitions"

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

export async function fetchPlayer(player_name: string) {
    try {
        const data = await sql<Player>`
        SELECT * FROM players
        WHERE player_name LIKE ${player_name}
        `;
        return data.rows[0]
    } catch (error) {
        console.log(error)
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

export async function addToMap(player_id: any, sport_id: any){
    try{
        await sql`
            INSERT INTO sports_players_map(player_id, sport_id, rating)
            VALUES(${player_id}, ${sport_id}, 1000)
            `
        }
    catch (error) {
        console.error("Player Rating already exists for this sport");
    }
}
