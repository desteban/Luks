import NextAuth, { User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/Prisma'
import { ObtenerUsuarioMinimoService, UsuarioBusqueda } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import { Usuario } from '@prisma/client'
import { CrearUsuarioService } from '@/Modules/Usuarios/Services/CrearUsuario.Service'
import CompararHashUsuarioService from '@/Modules/Usuarios/Services/CompararHashUsuario'

const handler = NextAuth({
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

				return { name: usuario.nombre, email: usuario.correo } as User
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async signIn(params) {
			const usuariodb = await ObtenerUsuarioMinimoService({
				correo: params.profile?.email ?? '',
				correoGoogle: params.profile?.email,
			})

			if (!usuariodb && params.profile) {
				const datos = await params.profile
				const datosCrear = await {
					nombre: datos.name,
					correo: datos.email,
					correoGoogle: datos.email,
				}

				try {
					const usuarioNuevo = await CrearUsuarioService(datosCrear as Usuario)
				} catch (error) {
					console.log('mal', error)
				}
			}

			return true
		},
	},
	pages: { signIn: '/login', newUser: '/registro' },
})

interface Profile {
	iss: string
	azp: string
	aud: string
	sub: string
	email: string
	email_verified: boolean
	at_hash: string
	name: string
	picture: string
	given_name: string
	locale: string
	iat: number
	exp: number
}

async function Profile(profile: Profile): Promise<Usuario | null> {
	const usuario = await ObtenerUsuarioMinimoService({ correo: profile.email })
	return usuario
}

export { handler as GET, handler as POST }
