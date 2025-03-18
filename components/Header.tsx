import { signOutAction } from "@/app/api/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { CircleDashed } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex items-center justify-between w-full p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl">BELMAR</h1>
          <CircleDashed className="text-sageGreen" />
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sageGreen">{user.email}</p>
            <form action={signOutAction}>
              <Button type="submit" variant={"outline"}>
                Sign out
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild size="sm" variant={"outline"}>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <ThemeSwitcher />
          </div>
        )}
      </div>
      <div className="h-[1px] bg-sageGreen w-full" />
    </>
  );
}
