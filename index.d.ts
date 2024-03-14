import NextAuth from 'next-auth'
import { User } from '@prisma/client'
import { JWT } from 'next-auth/jwt'

interface porpsIcons {
	size?: number
	className?: string
	onClick?: () => void
}

declare module 'next-auth' {
	interface Session {
		user: User
	}
}

declare module 'next-auth/jwt' {
	type JWT = User
}

interface RegistroGraficaRadar {
	tema: string
	valor: number | string
}

// type Usuario = {
//   id?: string;
//   nombre: string;
//   apellido?: string;
//   correo: string;
//   nombreUsuario: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// };
