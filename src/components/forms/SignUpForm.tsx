"use client"

import type React from "react"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup } from "@/actions/authActions"
import { useRouter } from 'next/navigation';



export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log(email);
    console.log(password);

    // Validações locais
    if (!email || !password) {
      setError('Preencha todos os campos');
      setIsLoading(false);
      return;
    }
    try {
      // Chamada para o serviço que espera apenas status 201
      const result = await signup({ email, password });

      // Lógica de sucesso (pode ser um redirect, toast, etc)
      console.log('Usuário cadastrado com sucesso');

      if (result.success && result.redirect)
        router.push('/auth');

        // Exemplo de ações após cadastro

        // toast.success('Cadastro realizado!');
        // setEmail('');
        // setPassword('');
      
    } catch (err) {
      // Tratamento de erro com verificação de tipo
      if (err instanceof Error) {
        setError(err.message);
      } else {
        // Caso o erro não seja uma instância de Error
        setError('Ocorreu um erro desconhecido');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        <form onSubmit={handleSubmit} >
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                className="w-full rounded-md border border-gray-300 p-4" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </Label>
              </div>
              <Input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-4" />
            </div>

            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <Button className="w-full rounded-md bg-emerald-400 p-6 text-base font-medium text-white hover:bg-emerald-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>

  )
}


