'use client'

import Card from '@/components/Card/Card'
import CardBody from '@/components/Card/CardBody'
import Input from '@/components/Input/Inputs'
import estilos from '../registro/estilos.module.css'
import { Button } from '@/components/ui/button'
import Password from '@/components/Input/Password'
import Link from 'next/link'
import IniciarConGoogle from '@/components/Botones/IniciarConGoogle'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Alerta } from '@/components/Alerta/Alerta'

type props = {
	searchParams?: Record<'callbackUrl' | 'error', string>
}

export default function Page(props: props) {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await signIn('credentials', {
			email: email,
			password: password,
			redirect: true,
			callbackUrl: '/inicio',
		})
	}

	return (
		<main className={estilos.contenedor}>
			<Card className={`${estilos.contenido} bg-gray-50`}>
				<div className="w-full">
					<h1 className="text-center mb-5">Regístrate</h1>

					<CardBody>
						{props.searchParams?.error ? (
							<Alerta
								tipo="error"
								mostrar
							>
								Credenciales invalidas
							</Alerta>
						) : null}

						<form
							className="mb-3"
							onSubmit={Submit}
						>
							<Input
								id="email"
								name="email"
								label="Correo"
								placeHolder="Correo"
								className="mb-5"
								value={email}
								onChange={(e) => setEmail(e.currentTarget.value)}
							/>

							<Password
								id="password"
								label="Contraseña"
								name="password"
								placeHolder="Contraseña"
								className="mb-2"
								value={password}
								onChange={(e) => setPassword(e.currentTarget.value)}
							/>

							<Button
								className="mt-4 w-full"
								type="submit"
							>
								Crear
							</Button>
						</form>

						<Link
							href={'/registro'}
							className="text-sm"
						>
							¿No tienes una cuenta?, regístrate
						</Link>

						<div className={estilos.botones}>
							<IniciarConGoogle />
						</div>
						<p className="text-right text-sm mt-4 w-full min-w-full">
							<Link href={'/'}>Regresar al inicio</Link>
						</p>
					</CardBody>
				</div>
			</Card>
		</main>
	)
}
