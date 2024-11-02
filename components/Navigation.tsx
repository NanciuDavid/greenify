import Link from "next/link";
import { Icon, Leaf, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";

export default async function Navigation() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-4 pr-4">
      <div className=" flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="hidden font-bold sm:inline-block">Greenify</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center">
          <ThemeToggle />
          <form action={signOutAction}>
            <Button type="submit" variant="ghost">
              Sign Out
            </Button>
          </form>
          <Button variant="ghost">
            <User></User>
          </Button>
        </div>
      </div>
    </header>
  ) : (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-4 pr-4">
      <div className=" flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="hidden font-bold sm:inline-block">Greenify</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button variant="default">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
