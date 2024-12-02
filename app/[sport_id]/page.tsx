import { title } from "@/components/primitives";
import { fetchSport } from '@/app/lib/queries';

export default async function HomePage() {
  const sport = fetchSport(sport_id);
  return (
    <div>
      <h1 className={title()}>{sport.name}</h1>
    </div>
  );
}
