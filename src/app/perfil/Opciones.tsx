'use client'

import UsuarioActualPeticion, { UsuarioActual } from '@/Services/Usuarios/UsuarioActual'
import Input from '@/components/Input/Inputs'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Opciones() {
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

	return (
		<div>
			{/* <pre>{JSON.stringify(usuario, null, 4)}</pre> */}
			<h2>Información de la cuenta</h2>
			<form className="mb-3">
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
				/>

				<Input
					id="nombreUsuario"
					name="nombreUsuario"
					label="Nombre de usuario"
					placeHolder="Nombre de usuario"
					className="mb-5"
					value={usuario.nombreUsuario ?? ''}
					onChange={ChangeInput}
				/>

				<Button className="w-full">Crear</Button>
			</form>
		</div>
	)
}
