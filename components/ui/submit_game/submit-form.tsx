'use client';
import { PlayerField, SportField } from '@/app/lib/definitions';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { submitGame, State } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { Input, Card } from '@nextui-org/react';

export default function Form({ players, sports }: { players: PlayerField[], sports: SportField[] }) {
    const [selectedPlayer1, setSelectedPlayer1] = useState('');
    const [selectedPlayer2, setSelectedPlayer2] = useState('');
    const [selectedSport, setselectedSport] = useState('');
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(submitGame, initialState);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="p-6 max-w-4xl bg-white rounded-lg shadow-md w-full">
                <h2 className="text-center text-red-900 text-3xl font-bold mb-10">
                Submit Game Score
                </h2>

                <form action={formAction}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="player1" className="text-sm font-medium text-gray-700">
                            Player 1 Name
                            </label>
                            <select
                                name="player1_id"
                                value={selectedPlayer1}
                                onChange={(e) => setSelectedPlayer1(e.target.value)}
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
                            <label htmlFor="player2" className="text-sm font-medium text-gray-700">
                            Player 2 Name
                            </label>
                            <select
                                name="player2_id"
                                value={selectedPlayer2}
                                onChange={(e) => setSelectedPlayer2(e.target.value)}
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
                            <label htmlFor="score1" className="text-sm font-medium text-gray-700">
                            Player 1 Score
                            </label>
                            <Input
                                name="score1"
                                aria-label="Player 1 Score"
                                placeholder="Enter Player 1's score"
                                type="number"
                                fullWidth
                                className="mt-2"
                            />
                            {state.errors?.score1 &&
                                state.errors.score1.map((error: string) => (
                                    <p className="text-sm text-red-500" key={error}>
                                    {error}
                                    </p>
                            ))}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="score2" className="text-sm font-medium text-gray-700">
                            Player 2 Score
                            </label>
                            <Input
                                name="score2"
                                aria-label="Player 2 Score"
                                placeholder="Enter Player 2's score"
                                type="number"
                                fullWidth
                                className="mt-2"
                            />
                            {state.errors?.score2 &&
                                state.errors.score2.map((error: string) => (
                                    <p className="text-sm text-red-500" key={error}>
                                    {error}
                                    </p>
                            ))}
                        </div>
                        
                        <div className="col-span-2 flex justify-center">
                            <div className="flex flex-col w-full">
                                <label htmlFor="sport" className="text-sm font-medium text-gray-700">
                                    Sport Name
                                </label>
                                <select
                                    name="sport_id"
                                    value={selectedSport}
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
                        </div>

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