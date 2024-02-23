import { porpsIcons } from '../..'

export function BuscarListaIcon({ className, onClick, size = 24 }: porpsIcons) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-list-search"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path
				stroke="none"
				d="M0 0h24v24H0z"
				fill="none"
			/>
			<path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
			<path d="M18.5 18.5l2.5 2.5" />
			<path d="M4 6h16" />
			<path d="M4 12h4" />
			<path d="M4 18h4" />
		</svg>
	)
}