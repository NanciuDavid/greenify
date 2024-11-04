"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Car, MapPin, Trophy, History, SquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import AddDialog from "./ProfileDialog";

interface FooterProps {}

const navigation = [
  { name: "Hartă", href: "/map", icon: MapPin },
  { name: "Clasament", href: "/leaderboard", icon: Trophy },
  { name: "Istoric", href: "/history", icon: History },
  { name: "Recompense", href: "/rewards", icon: Gift },
];

const Footer: FC<FooterProps> = ({}) => {
  const pathname = usePathname();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <AddDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}></AddDialog>
      <footer className="border-t sticky bottom-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-4 pr-4">
        <div className="flex h-16 items-center">
          <nav className="flex w-full items-center space-x-6 text-sm font-medium sm:justify-center sm: gap-8 justify-between p-2">
            {/* {navigation.map((item) => (
            <Link
              key={item.href}
              href={`/protected/${item.href}`}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
                "flex sm:gap-2 sm:flex-row flex-col items-center justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="sm:text-sm text-[0.75rem] sm:block sm:">{item.name}</span>
            </Link>
          ))} */}
            <Link
              key="/map"
              href={`/map`}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/protected/map" ? "text-foreground" : "text-foreground/60",
                "flex sm:gap-2 sm:flex-row flex-col items-center justify-center"
              )}
            >
              <MapPin className="h-5 w-5" />
              <span className="sm:text-sm text-[0.75rem] sm:block sm:">Hartă</span>
            </Link>
            <Link
              key="/leaderboard"
              href={`/leaderboard`}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/protected/map" ? "text-foreground" : "text-foreground/60",
                "flex sm:gap-2 sm:flex-row flex-col items-center justify-center"
              )}
            >
              <Trophy className="h-5 w-5" />
              <span className="sm:text-sm text-[0.75rem] sm:block sm:">Clasament</span>
            </Link>
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="outline"
              className="p-3 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background transition-all duration-300 hover:shadow-lg"
            >
              <SquarePlus className="" />
              {/* <span className="sm:text-sm text-[0.75rem] sm:block sm:">Adaugă</span> */}
            </Button>
            <Link
              key="/history"
              href={`/history`}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/protected/map" ? "text-foreground" : "text-foreground/60",
                "flex sm:gap-2 sm:flex-row flex-col items-center justify-center"
              )}
            >
              <History className="h-5 w-5" />
              <span className="sm:text-sm text-[0.75rem] sm:block sm:">Istoric</span>
            </Link>
            <Link
              key="/rewards"
              href={`/rewards`}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/protected/map" ? "text-foreground" : "text-foreground/60",
                "flex sm:gap-2 sm:flex-row flex-col items-center justify-center"
              )}
            >
              <Gift className="h-5 w-5" />
              <span className="sm:text-sm text-[0.75rem] sm:block sm:">Recompense</span>
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
