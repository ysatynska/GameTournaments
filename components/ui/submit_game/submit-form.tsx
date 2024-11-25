'use client';
import { PlayerField } from '@/app/lib/definitions';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
// import { Button } from '@/components/ui/button';
import { submitGame, State } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { Input, Card, Button } from '@nextui-org/react';

export default function Form({ players }: { players: PlayerField[] }) {
    const [selectedPlayer1, setSelectedPlayer1] = useState('');
    const [selectedPlayer2, setSelectedPlayer2] = useState('');
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(submitGame, initialState);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="p-6 max-w-4xl bg-white rounded-lg shadow-md w-full">
                <h2 className="text-center text-red-900 text-3xl font-bold mb-10">
                Submit Game Score
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" action={formAction}>
                        
                    <div className="flex flex-col">
                        <label htmlFor="player1" className="text-sm font-medium text-gray-700">
                        Player 1 Name
                        </label>
                        <select
                            id="player1"
                            value={selectedPlayer1}
                            onChange={(e) => setSelectedPlayer1(e.target.value)}
                            className="mt-2 p-2 border rounded-md"
                            >
                            <option value="">Select Player 1</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                {player.player_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="player2" className="text-sm font-medium text-gray-700">
                        Player 2 Name
                        </label>
                        <select
                            id="player2"
                            value={selectedPlayer2}
                            onChange={(e) => setSelectedPlayer2(e.target.value)}
                            className="mt-2 p-2 border rounded-md"
                            >
                            <option value="">Select Player 2</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                {player.player_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="score1" className="text-sm font-medium text-gray-700">
                        Player 1 Score
                        </label>
                        <Input
                        id="score1"
                        aria-label="Player 1 Score"
                        placeholder="Enter Player 1's score"
                        type="number"
                        fullWidth
                        className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="score2" className="text-sm font-medium text-gray-700">
                        Player 2 Score
                        </label>
                        <Input
                        id="score2"
                        aria-label="Player 2 Score"
                        placeholder="Enter Player 2's score"
                        type="number"
                        fullWidth
                        className="mt-2"
                        />
                    </div>

                    <div className="col-span-2">
                        <Button className="w-full mt-6 bg-red-900 text-white">
                        Submit Score
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}