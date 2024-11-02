import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const highlights = [
  {
    name: "Alin M.",
    avatar: "https://i.pravatar.cc/150?u=maria",
    achievement: "Utilizator de top luna noiembrie",
    stats: "1,500+ deșeuri reciclate",
    badge: "Elite",
  },
  {
    name: "David N.",
    avatar: "https://i.pravatar.cc/150?u=alex",
    achievement: "Utilizator de top luna octombrie",
    stats: "1,450+ deșeuri reciclate",
    badge: "Elite",
  },
  {
    name: "Tudor N.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    achievement: "Utilizator de top luna septembrie",
    stats: "1,000+ deșeuri reciclate",
    badge: "Veteran",
  },
];

export function CommunityHighlights() {
  return (
    <section className="container px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Clasamentul utilizatorilor</h2>
        <p className="mt-4 text-lg text-muted-foreground">Alătură-te utilizatorilor de top</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <Card key={highlight.name} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={highlight.avatar} />
                <AvatarFallback>{highlight.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{highlight.name}</h3>
                  <Badge variant="secondary">{highlight.badge}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{highlight.achievement}</p>
              </div>
            </div>
            <p className="text-muted-foreground">{highlight.stats}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
