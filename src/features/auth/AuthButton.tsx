import { auth } from "root/auth";
import { SignOut } from "./signOutButton";
import SignIn from "./signInButton";

export default async function AuthButton() {
  const session = await auth();
  console.log(session);
  if (session) {
    return <SignOut />;
  } else {
    return <SignIn />;
  }
}
