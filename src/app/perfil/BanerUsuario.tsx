'use client'

import { Skeleton } from '@/components/ui/skeleton'
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

	if (!session.data?.user) {
		return (
			<div className="flex items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center gap-2">
			<ImagenUsuario />
			<div>
				<h1 className="m-0 font-semibold text-lg">{session.data?.user?.name}</h1>
				<p className="m-0 text-sm">{session.data?.user?.email}</p>
			</div>
		</div>
	)
}
