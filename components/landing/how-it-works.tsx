import { Card } from "@/components/ui/card";
import { MapPin, QrCode, Trophy, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Găsește un centru de reciclare",
      description: "Localizează cel mai apropiat centru de reciclare utilizând harta interactivă",
    },
    {
      icon: QrCode,
      title: "Scanează și reciclează",
      description: "Scanează QR codul si depoziteaza deșeurile",
    },
    {
      icon: Trophy,
      title: "Câștigă puncte",
      description: "Câștigă puncte în aplicație pe baza cantității reciclate",
    },
    {
      icon: Zap,
      title: "Colecteaza recompense",
      description: "Convertește punctele in vouchere ce pot fi folosite la stațiile de incărcare electrice",
    },
  ];

  return (
    <section className="container px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cum functionează</h2>
        <p className="mt-4 text-lg text-muted-foreground">4 Pași simpli pentru o diferență semnificativă</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={step.title} className="p-6 text-center relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <step.icon className="mx-auto h-12 w-12 mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
