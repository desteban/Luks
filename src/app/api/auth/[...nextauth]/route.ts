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
	session: {
		strategy: 'jwt',
	},

	adapter: PrismaAdapter(prisma) as Adapter,

	providers: [
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

				const usuario = await prisma.user.findFirst({
					where: { email: credentials.email },
				})

				if (!usuario) {
					return null
				}

				let hashValido = await CompararHashUsuarioService(usuario, credentials.password)
				if (!hashValido) {
					return null
				}

				usuario.password = null
				return usuario
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],

	pages: { signIn: '/login', newUser: '/registro' },

	callbacks: {
		async jwt({ account, token, user, profile, session, trigger }) {
			if (trigger === 'update') {
				//token la infomacion sin actuaizar de usuario
				if (token) {
					let usuario = await ObtenerUsuarioService({ id: token.id })

					if (usuario) {
						usuario.password = null
					}

					token = { ...token, ...usuario }
					return { ...token, ...(usuario ?? user) }
				}
			}

			return { ...token, ...user }
		},
		async session({ newSession, session, token, trigger, user }) {
			session.user = token
			return session
		},
		// async redirect({ url, baseUrl }) {
		// 	return baseUrl
		// },
	},
})

export { config as GET, config as POST }
