'use client'

import { UserIcon } from '@iconos/UserIcon'
import { useSession } from 'next-auth/react'

export default function BanerUsuario() {
	const session = useSession()

	const ImagenUsuario = () => {
		if (session) {
			return (
				<img
					src={session.data?.user?.image ?? ''}
					alt={`Imagen de ${session.data?.user?.name}`}
					className="rounded-full h-10"
				/>
			)
		}

		return <UserIcon size={50} />
	}

	return (
		<div className="flex items-center gap-2">
			<ImagenUsuario />
			<div>
				<h1 className="m-0 font-semibold text-lg">{session.data?.user?.name ?? 'Nombre de la persona'}</h1>
				<p className="m-0 text-sm">{session.data?.user?.email ?? 'Correo de la persona'}</p>
			</div>
		</div>
	)
}
