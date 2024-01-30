interface props {
	onClick: () => void
}

export default function MenuPC({ onClick }: props) {
	return <div onClick={onClick}>Menú pc</div>
}
