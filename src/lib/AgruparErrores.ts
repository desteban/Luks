interface Mensaje {
	mensaje: string
	key: string
}

export function AgruparErrores(arreglo: Mensaje[]) {
	// const objetosAgrupados: Record<string, Mensaje[]> = arreglo.reduce((result, current) => {
	// 	const key = current.key
	// 	if (!result[key]) {
	// 		result[key] = []
	// 	}
	// 	result[key].push(current)
	// 	return result
	// }, {} as Record<string, Mensaje[]>)

	// return objetosAgrupados

	const resultado: { [key: string]: string } = arreglo.reduce((acumulador, actual) => {
		acumulador[actual.key] = actual.mensaje
		return acumulador
	}, {} as { [key: string]: string })

	return resultado
}
