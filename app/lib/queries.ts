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

export async function insertNewMatch (
    p1: string,
    p2: string,
    p1_score: number,
    p2_score: number,
    sport: string,
    tournament: string,
) {
    if (!supportedSports.includes(sport)) {
        throw new Error (`${sport} is not a supported.`);
    }
    //TODO: check if the tournament is finished before query
    //TODO: get the tournament id and player ids from their respective names
    //TODO: if there is no player with a given name, set up that player in the DB
    //TODO: review other edge cases
    try {
        const sport_id = supportedSports.indexOf(sport) + 1;
        await sql`
            INSERT INTO matches(sport_id, tournament_id, player1_id, player2_id, player1_score, player2_score)
            VALUES (${sport_id}, )
        `;
    } catch (error) {

    }
}
