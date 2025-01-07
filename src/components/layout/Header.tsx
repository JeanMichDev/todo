import AuthButton from "@/features/auth/AuthButton";
import { auth } from "root/auth";

export default async function Header() {
  const session = await auth();
  const sessionUser = session?.user;

  return (
    <header className="flex w-full items-center justify-center gap-2 p-4">
      <nav></nav>
      <div className="ml-auto flex gap-2 ">
        {sessionUser ? <h1>Welcome {sessionUser.name}</h1> : null}
        <AuthButton />
      </div>
    </header>
  );
}
