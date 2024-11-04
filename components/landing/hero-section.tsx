import { ArrowRight, Leaf } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeroSectionProps {
  defaultStats: { total_users: number; total_items_recycled: number; co2_saved: number; active_centers: number };
}

const HeroSection: FC<HeroSectionProps> = ({ defaultStats }) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className=" px-4 relative">
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
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/sign-in">
              Alătura-te comunității
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
