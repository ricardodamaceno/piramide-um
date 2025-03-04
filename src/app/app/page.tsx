import LogoutButton from "@/components/auth/LogoutButton";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
//quando o usuario estiver logado ele vem pra ca
export default async function Page() {

  const session = await getServerSession();

  if (!session) {
    redirect("/auth")
  }

  return (
    <div>
        <div>Logado.</div>
        <h1>Olá, {session?.user?.name}</h1>
        <div className="my-4"><LogoutButton/></div>
    </div>
  );
}