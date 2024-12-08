import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./libs/auth";

export default async function Page() {
  const session = await getServerSession(await authOptions);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}