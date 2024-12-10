'use client';
import { PlayerField, Sport } from '@/app/lib/definitions';
import { Button } from '@/components/ui/button';
import { submitGame, GameState } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Input, Card } from '@nextui-org/react';
import {Select, SelectItem} from "@nextui-org/react";

export default function Form({ players, sport }: { players: PlayerField[], sport: Sport }) {
    const initialState: GameState = { errors: {} };
    const [state, formAction] = useFormState(submitGame, initialState);

    return (
        <div className="min-h-full flex justify-center items-center w-full">
            <Card className="p-6 max-w-4xl rounded-lg shadow-2xl w-full outline outline-red-900">
                <h2 className="text-center text-red-900 text-3xl font-bold mb-10">
                    Submit Score - {sport.name}
                </h2>
                <form action={formAction}>
                    <Input type="hidden" name="sport_id" value={sport.id}/>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <Select 
                                className="max-w-full"
                                label="Player 1 Name" 
                                placeholder="Select Player 1"
                                variant="bordered" 
                                name="player1_id" 
                                size="md" 
                                labelPlacement="outside"
                                isRequired
                            >
                                {players.map((player) => (
                                <SelectItem key={player.id}>{player.name}</SelectItem>
                                ))}
                            </Select>
                            {state.errors?.player1_id &&
                                state.errors.player1_id.map((error: string) => (
                                    <p className="text-sm text-red-500 mt-2" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="flex flex-col">
                            <Select 
                                className="max-w-full"
                                label="Player 2 Name" 
                                placeholder="Select Player 2"
                                variant="bordered" 
                                name="player2_id" 
                                size="md" 
                                labelPlacement="outside"
                                isRequired
                            >
                                {players.map((player) => (
                                <SelectItem key={player.id}>{player.name}</SelectItem>
                                ))}
                            </Select>
                            {state.errors?.player2_id &&
                                state.errors.player2_id.map((error: string) => (
                                    <p className="text-sm text-red-500 mt-2" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                name="score1"
                                label="Player 1 Score"
                                placeholder="Enter player 1's score"
                                type="number"
                                fullWidth
                                className="max-w-full"
                                variant="bordered"
                                labelPlacement="outside"
                                isRequired
                            />
                            {state.errors?.score1 &&
                                state.errors.score1.map((error: string) => (
                                    <p className="text-sm text-red-500 mt-2" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                name="score2"
                                label="Player 2 Score"
                                placeholder="Enter Player 2's score"
                                type="number"
                                fullWidth
                                className="max-w-full"
                                variant="bordered"
                                labelPlacement="outside"
                                isRequired
                            />
                            {state.errors?.score2 &&
                                state.errors.score2.map((error: string) => (
                                    <p className="text-sm text-red-500 mt-2" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div className="col-span-2">
                            <Button className="w-full mt-3 bg-red-900 text-white flex items-center justify-center">
                                Submit Score
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
