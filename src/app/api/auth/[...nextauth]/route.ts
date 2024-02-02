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
/*

		CredentialsProvider({
			name: 'Ingresar',
			credentials: {
				email: {
					label: 'Correo',
					type: 'email',
					placeholder: 'Correo',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: 'Contraseña',
				},
			},
			async authorize(credentials, req) {
				if (!credentials || !credentials.email || !credentials.password) {
					return null
				}

				const usuario = await prisma.usuario.findFirst({
					where: { correo: credentials.email },
				})

				if (!usuario) {
					return null
				}

				let hashValido = await CompararHashUsuarioService(usuario, credentials.password)
				if (!hashValido) {
					return null
				}

				return { name: usuario.nombre, email: usuario.correo, id: usuario.id, sub: usuario.id }
			},
		}),

*/
