import { sql } from '@vercel/postgres';
import {
    Player,
    Tournament,
    Sport,
    Match,
    supportedSports,
} from "./definitions"

export async function fetchTournamentsPerSport(
    sport: string,
    topThree: boolean
) {
    if (!supportedSports.includes(sport)) {
        throw new Error ('${sport} is not a supported.')
    }
    try {
        const tournaments = await sql<Tournament>`
        SELECT tournaments.name AS tournament
        FROM tournaments
        JOIN ON 
         LIKE ${`%${sport}%`}`
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch .');
    }
}