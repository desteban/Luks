'use client'

import { signIn } from 'next-auth/react'
import GoogleIcon from '../../../public/iconos/GoogleIcon'
import Card from '../Card/Card'
import estilos from './estilos.module.css'

export default function IniciarConGoogle() {
	return (
		<Card
			className={estilos.boton}
			onClick={() => signIn('google', { callbackUrl: '/inicio', redirect: true })}
		>
			<GoogleIcon
				size={32}
				className="cursor-pointer"
			/>
		</Card>
	)
}
