import Link from 'next/link'
import { ReactNode } from 'react'

interface props {
	href: string
	children: ReactNode
	title?: string
}

export default function EnlaceMenu(props: props) {
	const { children } = props
	return (
		<Link
			className="text-black font-semibold leading-8 -tracking-tight"
			{...props}
		>
			{children}
		</Link>
	)
}
