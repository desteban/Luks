import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/Prisma'
import { ObtenerUsuarioService } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import { CrearUsuarioService } from '@/Modules/Usuarios/Services/CrearUsuario.Service'
import CompararHashUsuarioService from '@/Modules/Usuarios/Services/CompararHashUsuario'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'

const config = NextAuth({
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	pages: { signIn: '/login', newUser: '/registro' },
})

export { config as GET, config as POST }
