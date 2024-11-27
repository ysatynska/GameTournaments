export type Player = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type PlayerField = {
    id: string;
    name: string;
};

export type Game = {
    player1_id: string;
    player2_id: string;
    player1_score: number;
    player2_score: number;
    sport_id: string;
}

export type Tournament = {
    id: number;
    sport: string;
    name: string;
    date: string;
}

export type SportField = {
    id: string;
    name: string;
};

export type Sport = {
    id: string;
    name: string;
    created_at: Date;
    deleted_at: Date;
}

//TODO: QUERY THESE THROUGH THE DB
export const supportedSports = [
    "Ping Pong",
    "Pool",
    "Air Hockey",
    "Mario Kart",
    "FIFA",
]