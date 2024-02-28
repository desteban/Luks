'use client'

import Container from '@/components/Container/Container'
import { Nav } from '@/components/nav/Nav'
import { ReactNode } from 'react'

interface props {
	children?: ReactNode
}

export default function Contenedor({ children }: props) {
	return (
		<>
			<Nav />
			<Container>{children}</Container>
		</>
	)
}
