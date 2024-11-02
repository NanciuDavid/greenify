"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, Trophy, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface User {
  id: string;
  prenume: string;
  nume: string;
  email: string;
  deseuri_reciclate: number;
  credite: number;
  abonament: boolean;
}

interface EcoWarriorsDashboardProps {
  records?: User[];
}

function EcoWarriorsDashboard({ records = [] }: EcoWarriorsDashboardProps) {
  const sortedUsers = [...records].sort((a, b) => b.deseuri_reciclate - a.deseuri_reciclate);
  const topThreeUsers = sortedUsers.slice(0, 3);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
        <h2 className="text-2xl font-semibold">Clasament</h2>
      </div>

      <Card className="bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-white-400">
            Top-ul utilizatorilor luna noiembrie
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {topThreeUsers.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-800"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${user.prenume.charAt(0)}${user.nume.charAt(0)}`}
                    alt={`${user.prenume} ${user.nume}`}
                  />
                  <AvatarFallback>
                    {user.prenume.charAt(0)}
                    {user.nume.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {user.prenume} {user.nume}
                  </p>
                  <div className="flex flex-row justify-between items-center align-bottom ">
                    <p className="text-sm text-muted-foreground">{user.deseuri_reciclate} kg</p>
                    <Badge variant="secondary" className="mt-1 h-4 w-10 bg-yellow-200 text-yellow-800">
                      {`#${index + 1}`}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ScrollArea className="rounded-lg border h-[550px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
          {sortedUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48&text=${user.prenume.charAt(0)}${user.nume.charAt(0)}`}
                      alt={`${user.prenume} ${user.nume}`}
                    />
                    <AvatarFallback>
                      {user.prenume.charAt(0)}
                      {user.nume.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {user.prenume} {user.nume}
                    </h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium">{user.abonament ? "Premium" : "Free"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium">{user.credite} credite</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge
                    variant="outline"
                    className="w-full justify-center transition-colors duration-300 hover:bg-green-100 dark:hover:bg-green-800"
                  >
                    {user.deseuri_reciclate} kg reciclate
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function ThemedEcoWarriorsDashboard(props: EcoWarriorsDashboardProps) {
  return <EcoWarriorsDashboard {...props} />;
}
