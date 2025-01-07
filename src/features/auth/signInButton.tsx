import { Button } from "@/components/Button";
import { signIn } from "root/auth";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button size="md" type="submit">
        Signin with Google
      </Button>
    </form>
  );
}
