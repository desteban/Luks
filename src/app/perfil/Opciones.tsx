'use client'

import ActualizarUsuarioPeticion from '@/Services/Usuarios/ActualizarUsuario'
import UsuarioActualPeticion, { UsuarioActual } from '@/Services/Usuarios/UsuarioActual'
import { Alerta, AlertaProps } from '@/components/Alerta/Alerta'
import Input from '@/components/Input/Inputs'
import { Button } from '@/components/ui/button'
import { AgruparErrores } from '@/lib/AgruparErrores'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'

interface Errores {
	nombre?: string
	apellido?: string
	correo?: string
	correoGoogle?: string
	nombreUsuario?: string
}

export default function Opciones() {
	const session = useSession()
	const [alerta, setAlerta] = useState<AlertaProps>({ tipo: 'info' })
	const [errores, setErrores] = useState<Errores>({})
	const [usuario, setUsuario] = useState<UsuarioActual>({
		name: session.data?.user.name ?? '',
		email: session.data?.user.email ?? '',
		lastName: session.data?.user.lastName ?? '',
		// correoGoogle: '',
		// nombreUsuario: '',
	})

	useEffect(() => {}, [])

	const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget
		setUsuario({ ...usuario, [name]: value })
	}

	const OnSubimit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setErrores({})
		setAlerta({ tipo: 'info' })

		const actualizar = await ActualizarUsuarioPeticion({ usuario })

		if (actualizar.errors()) {
			const { message, contenido = [], StatusHttp, name } = actualizar.Error() as ErrorCustom

			if (StatusHttp === 404) {
				setAlerta({ tipo: 'error', mostrar: true, texto: message })
			}

			if (StatusHttp === 409 && Array.isArray(contenido)) {
				contenido.map((key) => setErrores({ ...errores, [key]: 'No es valido' }))
				return
			}

			if (contenido && Array.isArray(contenido)) {
				const mensajesError = AgruparErrores(contenido)
			}

			return
		}

		await session.update({ ...session, user: usuario })
		setAlerta({ tipo: 'success', texto: 'Se ha guardado la información correctamente.', mostrar: true })
	}

	return (
		<div>
			{/* <pre>{JSON.stringify(usuario, null, 4)}</pre> */}
			<h2>Información de la cuenta</h2>
			<form
				className="mb-3"
				onSubmit={OnSubimit}
			>
				<Alerta {...alerta} />

				<div className="campo-doble-adaptable">
					<Input
						id="name"
						label="Nombre"
						name="name"
						placeHolder="Nombre"
						required
						value={usuario.name}
						onChange={ChangeInput}
					/>

					<Input
						id="lastName"
						label="Apellido"
						placeHolder="Apellido"
						name="lastName"
						value={usuario.lastName ?? ''}
						onChange={ChangeInput}
					/>
				</div>

				<Input
					id="email"
					name="email"
					label="Correo"
					placeHolder="Correo"
					className="mb-5"
					required
					value={usuario.email}
					onChange={ChangeInput}
					mensajeError={errores.correo}
				/>

				{/* <Input
					id="nombreUsuario"
					name="nombreUsuario"
					label="Nombre de usuario"
					placeHolder="Nombre de usuario"
					className="mb-5"
					value={usuario.nombreUsuario ?? ''}
					onChange={ChangeInput}
					mensajeError={errores.nombreUsuario}
				/> */}

				<Button className="w-full">Crear</Button>
			</form>
		</div>
	)
}
