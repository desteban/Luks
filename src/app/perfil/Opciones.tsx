'use client'

import ActualizarUsuarioPeticion from '@/Services/Usuarios/ActualizarUsuario'
import UsuarioActualPeticion, { UsuarioActual } from '@/Services/Usuarios/UsuarioActual'
import { Alerta, AlertaProps } from '@/components/Alerta/Alerta'
import Input from '@/components/Input/Inputs'
import { Button } from '@/components/ui/button'
import { AgruparErrores } from '@/lib/AgruparErrores'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { FormEvent, useEffect, useState } from 'react'

interface Errores {
	nombre?: string
	apellido?: string
	correo?: string
	correoGoogle?: string
	nombreUsuario?: string
}

export default function Opciones() {
	const [alerta, setAlerta] = useState<AlertaProps>({ tipo: 'info' })
	const [errores, setErrores] = useState<Errores>({})
	const [usuario, setUsuario] = useState<UsuarioActual>({
		nombre: '',
		correo: '',
		apellido: '',
		correoGoogle: '',
		nombreUsuario: '',
	})

	useEffect(() => {
		ObtenerUsuarioActual()
	}, [])

	const ObtenerUsuarioActual = async () => {
		const usuarioAux = await UsuarioActualPeticion()
		if (usuarioAux instanceof Error) {
			console.error('No se puede obtener los datos del usuario')
			return
		}

		setUsuario(usuarioAux as UsuarioActual)
	}

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

			if (StatusHttp === 409 && Array.isArray(contenido)) {
				contenido.map((key) => setErrores({ ...errores, [key]: 'No es valido' }))
				return
			}

			if (contenido && Array.isArray(contenido)) {
				const mensajesError = AgruparErrores(contenido)
			}

			// alert('Algo mal')
		}

		console.log('Sin errores')
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
						id="nombre"
						label="Nombre"
						name="nombre"
						placeHolder="Nombre"
						required
						value={usuario.nombre}
						onChange={ChangeInput}
					/>

					<Input
						id="apellido"
						label="Apellido"
						placeHolder="Apellido"
						name="apellido"
						value={usuario.apellido ?? ''}
						onChange={ChangeInput}
					/>
				</div>

				<Input
					id="correo"
					name="correo"
					label="Correo"
					placeHolder="Correo"
					className="mb-5"
					required
					value={usuario.correo}
					onChange={ChangeInput}
					mensajeError={errores.correo}
				/>

				<Input
					id="nombreUsuario"
					name="nombreUsuario"
					label="Nombre de usuario"
					placeHolder="Nombre de usuario"
					className="mb-5"
					value={usuario.nombreUsuario ?? ''}
					onChange={ChangeInput}
					mensajeError={errores.nombreUsuario}
				/>

				<Button className="w-full">Crear</Button>
			</form>
		</div>
	)
}
