import { Button } from "@/components/Button";
import { signOut } from "root/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button size="md" className="" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
