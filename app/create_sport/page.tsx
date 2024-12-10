import { getAuthPlayer } from "@/app/auth";
import { redirect } from "next/navigation";
import CreateSportForm from "@/components/ui/create-sport-form";

export default async function CreateSport() {
  const player = await getAuthPlayer();
  if (!player) {
    redirect("/signin");
  }
  return (
    <div className="relative flex flex-col h-[calc(100vh-10rem)]">
      <CreateSportForm />
    </div>
  );
}
