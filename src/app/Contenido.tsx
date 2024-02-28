'use client'

import { Nav } from '@/components/nav/Nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Contenido() {
	const session = useSession()
	const router = useRouter()

	if (session.data?.user) {
		router.push('/inicio')
	}

	return (
		<>
			<Nav />
			<h1>Inicio</h1>
		</>
	)
}
