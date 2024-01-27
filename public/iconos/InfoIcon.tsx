interface props {
	width?: number
	height?: number
	stroke?: string
	strokeWidth?: number
}

export function InfoIcon({ height = 44, width = 44, stroke = '#00bfd8', strokeWidth = 2 }: props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-info-octagon"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke={stroke}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path
				stroke="none"
				d="M0 0h24v24H0z"
				fill="none"
			/>
			<path d="M9.103 2h5.794a3 3 0 0 1 2.122 .879l4.101 4.1a3 3 0 0 1 .88 2.125v5.794a3 3 0 0 1 -.879 2.122l-4.1 4.101a3 3 0 0 1 -2.123 .88h-5.795a3 3 0 0 1 -2.122 -.88l-4.101 -4.1a3 3 0 0 1 -.88 -2.124v-5.794a3 3 0 0 1 .879 -2.122l4.1 -4.101a3 3 0 0 1 2.125 -.88z" />
			<path d="M12 9h.01" />
			<path d="M11 12h1v4h1" />
		</svg>
	)
}
