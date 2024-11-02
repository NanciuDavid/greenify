import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, Lock } from "lucide-react";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex flex-row items-center justify-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Greenify
          </CardTitle>
        </CardHeader>
        <form className="flex-1 flex flex-col min-w-64 p-6">
          <h1 className="text-2xl font-medium">Sign up</h1>
          <p className="text-sm text text-foreground">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" href="/sign-in">
              Sign in
            </Link>
          </p>
          <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input className="pl-10" name="email" placeholder="you@example.com" required />
            </div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10"
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
            </div>
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </Card>
    </div>
  );
}
