import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/Prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Ingresar",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "Correo",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const usuario = await prisma.usuario.findFirst({
          where: { correo: credentials.email },
        });

        if (usuario) {
          return { name: usuario.nombre, email: usuario.correo } as User;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
