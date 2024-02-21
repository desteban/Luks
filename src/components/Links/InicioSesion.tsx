'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function InicioSesion() {
	const { data } = useSession()

	if (data) {
		return <Link href={'/inicio'}>Inicio</Link>
	}

	return <Link href={'/'}>Inicio</Link>
}
