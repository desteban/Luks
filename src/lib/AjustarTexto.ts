/**
 * Establece un limite de caracteres, si se supera este limite se mostrará una parte del texto y se  agregará "..." al final.
 * @param texto La cadena de texto a recortar si es necesario
 * @param tamanioMaximo Maximo de caracteres a mostrar
 */
export default function AjustarTexto(texto: string, tamanioMaximo: number): string {
	let tamanioTexto = texto.length

	// console.log('largo texto:', tamanioTexto, m)

	if (tamanioTexto <= tamanioMaximo) {
		return texto
	}

	//cortar texto 3 caracteres antes del manaño maximo
	const corte = tamanioMaximo

	const parteIzquierda = texto.slice(0, corte)
	const parteDerecha = texto.slice(corte)

	return `${parteIzquierda}...`
}
