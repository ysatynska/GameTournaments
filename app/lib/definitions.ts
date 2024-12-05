export type Player = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type RankRating = {
    name: string;
    rating: number;
    player_id: string;
}

export type PlayerField = {
    id: string;
    name: string;
};

export type Game = {
    player1_id: string;
    player2_id: string;
    score1: number;
    score2: number;
    sport_id: string;
    id: string;
    created_at: Date;
}

export type GamePlayer = {
    player1_id: string;
    player2_id: string;
    player1_name: string;
    player2_name: string;
    score1: number;
    score2: number;
    sport_id: string;
    id: string;
    created_at: Date;
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
    slug: string;
    name: string;
    created_at: Date;
    deleted_at: Date;
}

export type DropdownItem = {
    label: string;
    href: string;
    key: string;
}

export type SportDropdown = {
    id: string;
    name: string;
    slug: string;
    dropdownItems: DropdownItem[];
}
//TODO: QUERY THESE THROUGH THE DB
export const supportedSports = [
    "Ping Pong",
    "Pool",
    "Air Hockey",
    "Mario Kart",
    "FIFA",
]