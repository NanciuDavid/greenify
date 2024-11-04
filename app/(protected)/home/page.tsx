import StatsSection from "@/components/landing/stats-section";
import { createClient } from "@/utils/supabase/server";
import { Leaf } from "lucide-react";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const defaultStats = {
    total_users: 1000,
    total_items_recycled: 50000,
    co2_saved: 25,
    active_centers: 42,
  };

  return (
    <div className="flex flex-col items-center ">
      <section className="w-full bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background py-32 text-center overflow-hidden">
        <div className="inset-0 bg-grid-pattern opacity-5"></div>
        <div className=" px-4">
          <div className="animate-float">
            <Leaf className="mx-auto h-20 w-20 text-green-600 mb-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent pb-2">
            Contribuie la o viață mai buna
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Alatură-te comunității noastre de {defaultStats.total_users.toLocaleString()}+ eco-razboinici. Împreună am
            reușit sa reciclăm {defaultStats.total_items_recycled.toLocaleString()} deșeuri si am salvat{" "}
            {defaultStats.co2_saved.toLocaleString()} tone de CO₂.
          </p>
        </div>
      </section>
      <StatsSection stats={defaultStats} />
    </div>
  );
}
