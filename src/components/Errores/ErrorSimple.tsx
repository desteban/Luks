interface props {
	className?: string
	mensaje: string
}

export default function ErrorSimple({ className, mensaje }: props) {
	return <div className={`text-red-400 px-1 py-1 mt-1 rounded-md ${className ? className : ''}`}>{mensaje}</div>
}
