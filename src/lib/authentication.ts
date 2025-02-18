import { auth } from "root/auth";

export const getAuthSession = async () => {
  const session = await auth();
  return session;
};

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  return session as {
    user: {
      email: string;
      image?: string;
      name?: string;
      id: string;
    };
  };
};
