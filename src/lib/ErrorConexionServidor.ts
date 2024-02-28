/**
 * Esta función detecta si un error es generado por que no se puede conectar con el servidor
 * @param error Error que se genera al momento de utilizar fetch
 * @returns true / false
 */
export default function ErrorConexionServidor(error: Error | any): boolean {
	if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
		console.error('Error de red: no se pudo conectar al servidor.')
		return true
	}

	return false
}
