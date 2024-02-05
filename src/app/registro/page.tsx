'use client'

import Card from '@/components/Card/Card'
import CardBody from '@/components/Card/CardBody'
import Input from '@/components/Input/Inputs'
import estilos from './estilos.module.css'
import { Button } from '@/components/ui/button'
import Password from '@/components/Input/Password'
import Link from 'next/link'
import IniciarConGoogle from '@/components/Botones/IniciarConGoogle'
import { ChangeEvent, FormEvent, useState } from 'react'
import { CrearUsuarioTipo } from '@/Modules/Usuarios/Schemas/CrearUsuario.Schema'
import RegistrarNuevoUsuario from '@/Services/Usuarios/RegistrarNuevoUsuario'
import { Alerta, AlertaProps } from '@/components/Alerta/Alerta'
import { useRouter } from 'next/navigation'
import { ErrorParseSchema, UserDuplicated } from '@/lib/Errors'
import { ServerError } from '@/lib/Errors/ServerError'
import { AgruparErrores } from '@/lib/AgruparErrores'

const contenidoDefault = { email: '', name: '', password: '', lastName: '' }

export default function Page() {
	const router = useRouter()
	const [estado, setEStado] = useState<CrearUsuarioTipo>(contenidoDefault)
	const [errores, seterrores] = useState<CrearUsuarioTipo>(contenidoDefault)
	const [alerta, setAlerta] = useState<AlertaProps>({ tipo: 'info' })

	const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setEStado((prevEstado) => ({ ...prevEstado, [event.target.name]: event.target.value }))
	}

	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setAlerta({ tipo: 'info' })
		const crear = await RegistrarNuevoUsuario(estado)

		if (crear.errors()) {
			const error = crear.Error()
			if (error instanceof ErrorParseSchema) {
				setAlerta({ tipo: 'error', texto: 'por favor valide la información', mostrar: true })
				const listadoErrores = AgruparErrores(error.contenido)
				seterrores({ ...contenidoDefault, ...listadoErrores })
			}

			if (error instanceof UserDuplicated) {
				setAlerta({ tipo: 'error', texto: 'El correo no es valido', mostrar: true })
			}

			if (error instanceof ServerError) {
				setAlerta({ tipo: 'error', texto: 'No eres tu, somos nosotros, inténtalo mas tarde' })
			}

			return
		}

		router.push('/login')
	}

	return (
		<main className={estilos.contenedor}>
			<Card className={`${estilos.contenido} bg-gray-50`}>
				<div className="w-full">
					<h1 className="text-center mb-5">Crear tu cuenta hoy</h1>

					<CardBody>
						<form
							className="mb-3"
							onSubmit={Submit}
						>
							<Alerta {...alerta} />

							<div className="campo-doble-adaptable">
								<Input
									id="name"
									label="Nombre"
									name="name"
									placeHolder="Nombre"
									required
									value={estado.name}
									onChange={changeInput}
									mensajeError={errores.name}
								/>

								<Input
									id="lastName"
									label="Apellido"
									placeHolder="Apellido"
									name="lastName"
									value={estado.lastName}
									onChange={changeInput}
									mensajeError={errores.lastName}
								/>
							</div>

							<Input
								id="email"
								name="email"
								label="Correo"
								placeHolder="Correo"
								className="mb-5"
								required
								value={estado.email}
								onChange={changeInput}
								mensajeError={errores.email}
							/>

							{/* <Input
								id="usuario"
								name="usuario"
								label="Nombre de usuario"
								placeHolder="Nombre de usuario"
								className="mb-5"
							/> */}

							<Password
								id="password"
								label="Contraseña"
								name="password"
								placeHolder="Contraseña"
								className="mb-2"
								required
								value={estado.password}
								onChange={changeInput}
								mensajeError={errores.password}
							/>

							<Button className="mt-4 w-full">Crear</Button>
						</form>

						<Link
							href={'/login'}
							className="text-sm"
						>
							¿Ya tienes una cuenta?, Inicia sesión
						</Link>

						<div className={estilos.botones}>
							<IniciarConGoogle />
						</div>
						<p className="text-right text-sm mt-4 min-w-full">
							<Link href={'/'}>Regresar al inicio</Link>
						</p>
					</CardBody>
				</div>
			</Card>
		</main>
	)
}
