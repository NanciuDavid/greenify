import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, MapPin, Trophy, Zap, Recycle, TreePine, Timer, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AirQualityCard } from "@/components/air-quality-card";
import { StatsSection } from "@/components/stats-section";
import { HowItWorks } from "@/components/how-it-works";
import { CommunityHighlights } from "@/components/community-highlights";
import HeroSection from "@/components/hero-section";

const defaultStats = {
  total_users: 1000,
  total_items_recycled: 50000,
  co2_saved: 25,
  active_centers: 42,
};

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroSection defaultStats={defaultStats} />
      {/* Stats Section */}
      <StatsSection stats={defaultStats} />

      {/* How It Works */}
      <HowItWorks />

      {/* Features Grid */}
      <section className="container px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Toți pașii pentru a face diferența
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Alatură-te in program pentru a contribui la calitate a vieții mai bună
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <MapPin className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Smart Map</h3>
            <p className="text-muted-foreground mb-4">Găsește cel mai apropiat centru de reciclare in timp real.</p>
            <Button variant="secondary" asChild className="w-full">
              <Link href="/map">View Map</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Trophy className="h-12 w-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Clasament</h3>
            <p className="text-muted-foreground mb-4">Câștigă puncte bonus și revendică recompensele eco-friendly.</p>
            <Button variant="secondary" asChild className="w-full">
              <Link href="/leaderboard">Urmărește clasamentul</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Zap className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Recompense eco-friendly</h3>
            <p className="text-muted-foreground mb-4">
              Vouchere de reducere ce pot fi utilizate la stațiile de încărcare electrică
            </p>
            <Button variant="secondary" asChild className="w-full">
              <Link href="/ev">Register EV</Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Air Quality Section */}
      <AirQualityCard />

      {/* Community Highlights */}
      <CommunityHighlights />
    </div>
  );
}
