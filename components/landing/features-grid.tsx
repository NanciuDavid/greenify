import { MapPin, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function FeaturesGrid() {
  return (
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
            <Link href="/rewards">Revendica recompense</Link>
          </Button>
        </Card>
      </div>
    </section>
  );
}
