// Here are definitions for all of the data types that will be queried from the database.

export type Player = {
    id: number;
    name: string;
}

export type Tournament = {
    id: number;
    sport: string;
    name: string;
    date: string;
}

export type Sport = {
    id: number;
    name: string;
}

export type Match = {
    match_id: number;
    player1_name: string;
    player2_name: string;
    player1_score: number;
    player2_score: number;
}

//TODO: QUERY THESE THROUGH THE DB
export const supportedSports = [
    "Ping Pong",
    "Pool",
    "Air Hockey",
    "Mario Kart",
    "FIFA",
]
