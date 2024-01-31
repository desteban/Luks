import Link from 'next/link'
import { ReactNode } from 'react'

interface props {
	children: ReactNode
	className?: string
	href: string
	title?: string
}

export default function EnlaceMenu(props: props) {
	const { children, className } = props
	return (
		<Link
			{...props}
			className={`text-black font-semibold leading-8 -tracking-tight ${className ?? ''}`}
		>
			{children}
		</Link>
	)
}
