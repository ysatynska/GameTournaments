'use client';
import { PlayerField, Sport } from '@/app/lib/definitions';
import { Button } from '@/components/ui/button';
import { submitGame, State, GameState } from '@/app/lib/actions';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Input, Card } from '@nextui-org/react';

export default function Form({ players, sport }: { players: PlayerField[], sport: Sport }) {
    // const [selectedPlayer1, setSelectedPlayer1] = useState('');
    // const [selectedPlayer2, setSelectedPlayer2] = useState('');
    // const [selectedSport, setselectedSport] = useState('');
    // const [score1, setScore1] = useState('');
    // const [score2, setScore2] = useState('');
    const initialState: GameState = { errors: {} };
    const [state, formAction] = useFormState(submitGame, initialState);

//     console.log("Selected Player 1:", selectedPlayer1);
// console.log("Selected Player 2:", selectedPlayer2);
// console.log("Score 1:", score1);
// console.log("Score 2:", score2);

    // useEffect(() => {
    //     setSelectedPlayer1(state.values.player1_id ?? "");
    //     setSelectedPlayer2(state.values.player2_id ?? "");
    //     setselectedSport(state.values.sport_id ?? "");
    //     setScore1(state.values.score1 ?? "");
    //     setScore2(state.values.score2 ?? "");
    // }, [state.values]);

    // const changeP1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     console.log("chanign pi to ", event.target.value)
    //     setSelectedPlayer1(event.target.value);
    // };
    

    return (
        // <div className="min-h-full flex justify-center items-center" key={JSON.stringify(state.values)}>
        <div className="min-h-full flex justify-center items-center">
            <Card className="p-6 max-w-4xl rounded-lg shadow-md w-full">
                <h2 className="text-center text-red-900 text-3xl font-bold mb-10">
                    Submit Game Score - {sport.name}
                </h2>
                <form action={formAction}>
                    <Input type="hidden" name="sport_id" value={sport.id}/>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="player1" className="text-sm font-medium">
                                Player 1
                            </label>
                            <select
                                name="player1_id"
                                // value={selectedPlayer1}
                                // onChange={changeP1}
                                className="mt-2 p-2 border rounded-md"
                            >
                                <option value="">Select Player 1</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                            {state.errors?.player1_id &&
                                state.errors.player1_id.map((error: string) => (
                                    <p className="text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="player2" className="text-sm font-medium">
                                Player 2
                            </label>
                            <select
                                name="player2_id"
                                // value="16"
                                // onChange={(e) => setSelectedPlayer2(e.target.value)}
                                className="mt-2 p-2 border rounded-md"
                            >
                                <option value="">Select Player 2</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                            {state.errors?.player2_id &&
                                state.errors.player2_id.map((error: string) => (
                                    <p className="text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="score1" className="text-sm font-medium">
                                Player 1 Score
                            </label>
                            <Input
                                name="score1"
                                aria-label="Player 1 Score"
                                placeholder="Enter Player 1's score"
                                type="number"
                                fullWidth
                                className="mt-2"
                                // value="6"
                                // onChange={(e) => setScore1(e.target.value)}
                            />
                            {state.errors?.score1 &&
                                state.errors.score1.map((error: string) => (
                                    <p className="text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="score2" className="text-sm font-medium">
                                Player 2 Score
                            </label>
                            <Input
                                name="score2"
                                aria-label="Player 2 Score"
                                placeholder="Enter Player 2's score"
                                type="number"
                                fullWidth
                                className="mt-2"
                                // value="23"
                                // onChange={(e) => setScore2(e.target.value)}
                            />
                            {state.errors?.score2 &&
                                state.errors.score2.map((error: string) => (
                                    <p className="text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        {/* <div className="col-span-2 flex justify-center">
                            <div className="flex flex-col w-full">
                                <label htmlFor="sport" className="text-sm font-medium">
                                    Which Sport?
                                </label>
                                <select
                                    name="sport_id"
                                    value={state.values?.sport_id || selectedSport}
                                    onChange={(e) => setselectedSport(e.target.value)}
                                    className="mt-2 p-2 border rounded-md"
                                >
                                    <option value="">Select Sport</option>
                                    {sports.map((sport) => (
                                        <option key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </option>
                                    ))}
                                </select>
                                {state.errors?.sport_id &&
                                    state.errors.sport_id.map((error: string) => (
                                        <p className="text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div> */}

                        <div className="col-span-2">
                            <Button className="w-full mt-3 bg-red-900 text-white">
                                Submit Score
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
