import { getAuthPlayer } from '@/app/auth';
import { fetchSportSlug, getSubmitGameSession, fetchPlayer } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function ThankYou({ params }: any) {
    // Fetch the game session data
    const data = await getSubmitGameSession();
    
    // Default outcome is 1 (player1 wins)
    let outcome = 1;
    
    // Determine the outcome based on scores
    if (data?.score1 && data?.score2) {
        if (data.score1 === data.score2) {
            outcome = 0.5; // Draw
        } else if (data.score1 < data.score2) {
            outcome = 0; // Player 2 wins
        }
    }
    
    // Fetch the authenticated player, redirect if not logged in
    const player = await getAuthPlayer();
    if (!player) {
        redirect("/login");
    }
    
    // Fetch sport details and player data
    const sport = await fetchSportSlug(params.sport_slug);
    const player1 = await fetchPlayer(data?.player1_id);
    const player2 = await fetchPlayer(data?.player2_id);

    // Conditional rendering based on outcome
    return (
        <div>
            {outcome === 1 && (
                <div>
                    <h1 className="text-center text-red-900 text-xl font-bold mb-3">
                        <strong>{player1?.name}</strong> Wins!
                    </h1>
                    {data?.score1 && data?.increment1 && data?.score2 && data?.increment2 ? (
                        <>
                            <p><strong>{player1?.name}</strong> score: <strong>{data?.score1}</strong></p>
                            <p className="text-green-700">+<strong>{data?.increment1}</strong></p>
                            <p><strong>{player2?.name}</strong> score: <strong>{data?.score2}</strong></p>
                            <p className="text-red-900"><strong>{data?.increment2}</strong></p>
                        </>
                    ) : (
                        <p>Error...</p>
                    )}
                </div>
            )}

            {outcome === 0 && (
                <div>
                    <h1 className="text-center text-red-900 text-xl font-bold mb-3">
                        <strong>{player2?.name}</strong> Wins!
                    </h1>
                    {data?.score1 && data?.increment1 && data?.score2 && data?.increment2 ? (
                        <>
                            <p><strong>{player1?.name}</strong> score: <strong>{data?.score1}</strong></p>
                            <p className="text-red-900"><strong>{data?.increment1}</strong></p>
                            <p><strong>{player2?.name}</strong> score: <strong>{data?.score2}</strong></p>
                            <p className="text-green-700">+<strong>{data?.increment2}</strong></p>
                        </>
                    ) : (
                        <p>Error...</p>
                    )}
                </div>
            )}

            {outcome === 0.5 && (
                <div>
                    <h1 className="text-center text-red-900 text-xl font-bold mb-3">Draw!</h1>
                    {data?.score1 && data?.score2 ? (
                        <>
                            <p><strong>{player1?.name}</strong> score: <strong>{data?.score1}</strong></p>
                            <p><strong>{player2?.name}</strong> score: <strong>{data?.score2}</strong></p>
                        </>
                    ) : (
                        <p>Error...</p>
                    )}
                </div>
            )}
        </div>
    );
}
