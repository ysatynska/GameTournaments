import { getAuthPlayer } from '@/app/auth';
import { fetchSportSlug, getSubmitGameSession, fetchPlayer } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function ThankYou({ params }: any) {
    // Fetch the authenticated player, redirect if not logged in
    const player = await getAuthPlayer();
    if (!player) {
        redirect("/login");
    }
    
    // Fetch the game session data
    const data = await getSubmitGameSession();
    
    // Default outcome is 1 (player1 wins)
    let outcome = 1;
    if (data?.score1 && data?.score2) {
        if (data.score1 === data.score2) {
            outcome = 0.5; // Draw
        } else if (data.score1 < data.score2) {
            outcome = 0; // Player 2 wins
        }
    }

    // Fetch sport details and player data
    const sport = await fetchSportSlug(params.sport_slug);
    const player1 = await fetchPlayer(data?.player1_id);
    const player2 = await fetchPlayer(data?.player2_id);

    return (
        <div className="min-h-full flex justify-center items-center">
            <div className="p-14 rounded-lg shadow-2xl w-96 text-center outline outline-red-900">
                <h2 className="text-2xl font-bold mb-6">Game Result</h2>
                <div>
                    {(outcome === 1 || outcome === 0) ? (
                        <div>
                            <h1 className="text-2xl font-semibold text-red-600 mb-6">
                                <strong>{outcome === 1 ? player1?.name : player2?.name}</strong> Wins!
                            </h1>
                            <div>
                            <p><strong>{player1?.name}</strong></p>
                            <p>Score: <strong>{data?.score1}</strong></p>
                            <p>Rating: <strong>{data?.rating1}</strong>
                                <span className={outcome === 1 ? "text-green-700" : "text-red-600"}><strong> ({outcome === 1 && "+"}{data?.increment1})</strong></span>
                            </p>
                            <hr className="m-5"></hr>
                            <p><strong>{player2?.name}</strong></p>
                            <p>Score: <strong>{data?.score2}</strong></p>
                            <p>Rating: <strong>{data?.rating2}</strong>
                                <span className={outcome === 0 ? "text-green-700" : "text-red-600"}><strong> ({outcome === 0 && "+"}{data?.increment2})</strong></span>
                            </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-semibold text-red-600 mb-6">
                                It's a Draw!
                            </h1>
                            <div>
                                <p><strong>{player1?.name}</strong></p>
                                <p>Score: <strong>{data?.score1}</strong></p>
                                <p>Rating: <strong>{data?.rating1}</strong>
                                    <span className="text-yellow-700"><strong> (&plusmn;0)</strong></span>
                                </p>
                                <hr className="m-5"></hr>
                                <p><strong>{player2?.name}</strong></p>
                                <p>Score: <strong>{data?.score2}</strong></p>
                                <p>Rating: <strong>{data?.rating2}</strong>
                                    <span className="text-yellow-700"><strong> (&plusmn;0)</strong></span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
