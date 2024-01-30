export default function MenuIcon({ className, onClick, size = 32 }: porpsIcons) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`icon icon-tabler icon-tabler-menu-2 ${className}`}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			onClick={onClick}
		>
			<path
				stroke="none"
				d="M0 0h24v24H0z"
				fill="none"
			/>
			<path d="M4 6l16 0" />
			<path d="M4 12l16 0" />
			<path d="M4 18l16 0" />
		</svg>
	)
}
