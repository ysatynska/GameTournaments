import psycopg



def calculate_elo(elo1, elo2, p1_win, k_factor=32):
    # Calculate expected scores
    expected1 = 1 / (1 + 10 ** ((elo2 - elo1) / 400))
    expected2 = 1 / (1 + 10 ** ((elo1 - elo2) / 400))

    # Update Elos based on actual result
    new_elo1 = elo1 + k_factor * (p1_win - expected1)
    new_elo2 = elo2 + k_factor * ((1 - p1_win) - expected2)

    return new_elo1, new_elo2

def update_elo(player1, player2, score1, score2):
    pass


#adds new player
def addPlayer(first, last):
    with psycopg.connect("dbname=players user=postgres") as conn:

    # Open a cursor to perform database operations
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO players (first_name, last_name) VALUES (%s, %s)",
                (first, last))
            
            cur.execute(
                "INSERT INTO sports_players_map (first_name, last_name) VALUES (%s, %s)",
                (first, last))
            
#adds new sport
def addSport(name):
    with psycopg.connect("dbname=sport user=postgres") as conn:

    # Open a cursor to perform database operations
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO sport (name) VALUES (%s)",
                (name))
            

def addMatch(p1, p2, sport, p1_score, p2_score, tournament="None"):
    with psycopg.connect("dbname=match user=postgres") as conn:

    # Open a cursor to perform database operations
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO sport (player1_id, player2_id, sport, player1_score, player2_score) VALUES (%s)",
                (p1, p2, sport, p1_score, p2_score, tournament))
