import prisma from '@/lib/Prisma'

interface Paginacion {
	pagina: number
	porPagina: number
	totalPaginas: number
	total: number
}

export default async function PaginacionGastos(userId: string, pagina: number, porPagina: number): Promise<Paginacion> {
	const CantidadGastos = await TotalGastosUsuario(userId)
	const totalPaginas = Math.round(CantidadGastos / porPagina)

	return {
		pagina: pagina + 1,
		porPagina,
		totalPaginas: totalPaginas === 0 ? 1 : totalPaginas,
		total: CantidadGastos,
	}
}

async function TotalGastosUsuario(userId: string): Promise<number> {
	let cantidad = await prisma.gastos.count({ where: { userId } })
	return cantidad ?? 0
}
