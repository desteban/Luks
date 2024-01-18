interface props {
  req: Request;
}

export default async function ObtenerDatosRquest({ req }: props) {
  return await req.json().catch((err) => ({}));
}
