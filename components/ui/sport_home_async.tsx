import { fetchSportSlug } from "@/app/lib/queries";

export async function SportHomeAsync ({ sportSlug }: any) {
    const sport = fetchSportSlug(sportSlug);
    console.log(sport);
    
    return (
        <div>home</div>
    )
}