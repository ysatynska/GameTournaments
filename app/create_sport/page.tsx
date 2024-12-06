import { getAuthPlayer } from '@/app/auth';
import { redirect } from "next/navigation";
import CreateSportForm from "@/components/ui/create-sport-form";

export default async function CreateSport() {
  const player = await getAuthPlayer();
  if (!player) {
    redirect("/login");
  }
  return (
    <CreateSportForm/>
  );
}
