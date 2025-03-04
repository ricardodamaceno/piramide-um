import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
//quando o usuario estiver logado ele vem pra ca
export default async function Page() {

  const session = await getServerSession();

  if (!session) {
    redirect("/auth")
  }

  return (
    <div>Logado</div>
  );
}