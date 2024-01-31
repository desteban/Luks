export default function MenuIcon({ className, onClick, size = 32 }: porpsIcons) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`icon icon-tabler icon-tabler-menu-deep ${className}`}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			strokeWidth="2"
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
			<path d="M4 6h16" />
			<path d="M7 12h13" />
			<path d="M10 18h10" />
		</svg>
	)
}
