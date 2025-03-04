import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"


const handler = NextAuth({
  pages: {
    signIn: "/auth"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null
        }

        try {
          const response = await fetch(`${process.env.BASE_URL}/api/Auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          console.log(JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }));

          console.log(`${process.env.BASE_URL}/api/Auth/login`);

          if (response.status !== 200) return null;

          const authData = await response.json();

          if (!authData.jwt) return null;

          (await cookies()).set("jwt", authData.jwt);

          return {
            id: "1",
            name: authData.user,
          };
        } catch (e) {
          return null;
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }