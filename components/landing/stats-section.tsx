import { Card } from "@/components/ui/card";
import { Recycle, TreePine, Users, Timer } from "lucide-react";

interface PlatformStats {
  total_users: number;
  total_items_recycled: number;
  co2_saved: number;
  active_centers: number;
}

export default function StatsSection({ stats }: { stats: PlatformStats }) {
  const statItems = [
    {
      icon: Users,
      label: "Utilizatori activi",
      value: stats?.total_users.toLocaleString(),
    },
    {
      icon: Recycle,
      label: "Deșeuri reciclate",
      value: stats?.total_items_recycled.toLocaleString(),
    },
    {
      icon: TreePine,
      label: "Tone de CO₂ salvate",
      value: stats?.co2_saved.toLocaleString(),
    },
    {
      icon: Timer,
      label: "Centre de reciclare",
      value: stats?.active_centers.toLocaleString(),
    },
  ];

  return (
    <section className="container px-4 -mt-12 relative z-10">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item) => (
          <Card key={item.label} className="p-6 text-center">
            <item.icon className="mx-auto h-8 w-8 mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">{item.value}</div>
            <p className="text-muted-foreground">{item.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
