import {getServerSession } from "next-auth"
import { redirect } from "next/navigation";

import AuthPage from "@/components/auth/AuthForms";

export default async function Page() {

  const session = await getServerSession();

  if (session) {
    redirect("/app")
  }
  
    return (
      <AuthPage/>
    );
  }