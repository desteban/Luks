import { porpsIcons } from '../..'

export default function DerechaIcon({ className, onClick, size = 24 }: porpsIcons) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`icon icon-tabler icon-tabler-chevron-right ${className}`}
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
			<path d="M9 6l6 6l-6 6" />
		</svg>
	)
}
