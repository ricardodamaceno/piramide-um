"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1>Bem-vindo ao meu projeto!</h1>
        <div>
        <Button
          className="my-4" 
          onClick={() => router.push('/auth')} >
          Login
        </Button>
        </div>
      </div>
    </main>
  );
}
