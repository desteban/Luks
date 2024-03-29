import { NextResponse } from 'next/server'
import { ErrorCustom } from './Errors/ErrorCustom'

interface props {
	config?: ResponseInit
	data?: any
}

export function RespuestaJson({ config, data }: props) {
	return NextResponse.json(data, { ...config })
}

interface propsError {
	respuesta: {
		data?: any
		mensaje: string
	}
	config?: ResponseInit
}

export function RespuestaJsonError(error: ErrorCustom) {
	return NextResponse.json({ mensaje: error.message, data: error.contenido ?? undefined }, { status: error.StatusHttp })
}
