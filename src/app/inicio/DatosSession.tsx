'use client'

import { LoaderCircular } from '@/components/Loader/LoaderCircular'
import { useSession } from 'next-auth/react'

export default function DatosSession() {
	const session = useSession()

	if (session.status === 'loading') {
		return <LoaderCircular />
	}

	return (
		<div>
			<h1 className="mb-2">¡Hola!</h1>
			<h3>{session.data?.user?.name}</h3>
		</div>
	)
}
