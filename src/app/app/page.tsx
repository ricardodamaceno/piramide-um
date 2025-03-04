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
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1>Logado!</h1>
        <h1>Olá, {session?.user?.name}</h1>
        <div className="my-4"><LogoutButton /></div>
      </div>
    </div>
  );
}