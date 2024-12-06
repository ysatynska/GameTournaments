import RanksTable from '@/components/ui/ranks-table';
import { getAuthPlayer } from '@/app/auth';
import { fetchRatings, fetchSportSlug } from "@/app/lib/queries";
import { redirect } from "next/navigation";

export default async function ThankYou ({params, name1, score1, increment1, name2, score2, increment2}: any) {
    let outcome = 1;
    if (score1 == score2) {
        outcome = 0.5;
    } else if (score1 - score2 < 0) {
        outcome = 0;
    }

  const player = await getAuthPlayer();
  if (!player) {
    redirect("/login");
  }
  const sport = await fetchSportSlug(params.sport_slug);

    if (outcome == 1) {
        return (
        <div>
            <h1 className="text-center text-red-900 text-xl font-bold mb-3"><strong>{name1}</strong> Wins!</h1>
            {score1 && increment1 && score2 && increment2 ? (
                <>
                    <p><strong>{name1}</strong> score: <strong>{score1}</strong></p>
                    <p className="text-green-700">+<strong>{increment1}</strong></p>
                    <p><strong>{name2}</strong> score: <strong>{score2}</strong></p>
                    <p className="text-red-900">-<strong>{increment2}</strong></p>
                </>
            ) : (
                <p>Error...</p>
            )}
        </div>
    );
    }
    else if (outcome == 0) {
        return (
        <div>
            <h1 className="text-center text-red-900 text-xl font-bold mb-3"><strong>{name2}</strong> Wins!</h1>
            {score1 && increment1 && score2 && increment2 ? (
                <>
                    <p><strong>{name1}</strong> score: <strong>{score1}</strong></p>
                    <p className="text-red-900">-<strong>{increment1}</strong></p>
                    <p><strong>{name2}</strong> score: <strong>{score2}</strong></p>
                    <p className="text-green-700">+<strong>{increment2}</strong></p>
                </>
            ) : (
                <p>Error...</p>
            )}
        </div>
    );
    }
    else{
        <div>
            <h1 className="text-center text-red-900 text-xl font-bold mb-3">Draw!</h1>
            {score1 && increment1 && score2 && increment2 ? (
                <>
                    <p><strong>{name1}</strong> score: <strong>{score1}</strong></p>
                    <p><strong>{name2}</strong> score: <strong>{score2}</strong></p>
                </>
            ) : (
                <p>Error...</p>
            )}
        </div>
    }
};

