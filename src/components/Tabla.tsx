'use client'

import ListadoUsuarios, { RootListadoUsuarios } from '@/Services/ListadoUsuarios'
import { useEffect, useState } from 'react'

export function Tabla() {
	const [root, setRoot] = useState<RootListadoUsuarios | null>(null)

	useEffect(() => {
		async function Inicio() {
			const respuesta = await ListadoUsuarios()
			setRoot(respuesta)
		}

		console.log('aplicando efecto')

		Inicio()
	}, [])

	return (
		<div>
			<h2>Datos desde front</h2>
			<pre>{JSON.stringify(root, null, 4)}</pre>
		</div>
	)
}
