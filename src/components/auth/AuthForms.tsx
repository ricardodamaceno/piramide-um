"use client"

import Link from "next/link"
import { signIn } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function AuthPage() {

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    console.log(data)

    // Aqui, fazemos o login
    await signIn("credentials", {
      ...data,
      callbackUrl: "/app"
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={login}>
          <div className="w-full max-w-md space-y-6">
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 p-6 text-base font-medium"
            >
              <Image
                src="/icons-google-48.png"
                alt="Descrição da imagem"
                width={24}
                height={24}
              />
              Login com Google
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative bg-white px-4 text-sm text-gray-500">OU</div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" type="email" name="email" placeholder="nome@email.com" className="w-full rounded-md border border-gray-300 p-4" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <Link href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" className="w-full rounded-md border border-gray-300 p-4" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar-me
                </label>
              </div>

              <Button className="w-full rounded-md bg-emerald-400 p-6 text-base font-medium text-white hover:bg-emerald-500"
                type="submit"
              >
                Log In
              </Button>
            </div>

            {/* <div className="text-center text-sm">
          <Link href="#" className="text-gray-800 hover:underline">
            Haven&apos;t received the confirmation email yet?
          </Link>
        </div> */}
          </div>
        </form>
      </div>
    </div>

  )
}

