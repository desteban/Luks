interface props {
	req: Request
}

export default async function ObtenerDatosRequest({ req }: props) {
	return await req.json().catch((err) => ({}))
}
