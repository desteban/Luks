const { PrismaClient } = require('@prisma/client')

async function seeding() {
	// import prisma from '../lib/Prisma'
	let prisma = new PrismaClient()

	console.log('seedin Tipos Gastos')

	await prisma.tiposGastos.create({ data: { id: 1, imagen: '', nombre: 'Otros' } })
	await prisma.tiposGastos.create({ data: { id: 2, imagen: '', nombre: 'Vivienda' } })
	await prisma.tiposGastos.create({ data: { id: 3, imagen: '', nombre: 'Alimentación' } })
	await prisma.tiposGastos.create({ data: { id: 4, imagen: '', nombre: 'Transporte' } })
	await prisma.tiposGastos.create({ data: { id: 5, imagen: '', nombre: 'Salud' } })
	await prisma.tiposGastos.create({ data: { id: 6, imagen: '', nombre: 'Educación' } })
	await prisma.tiposGastos.create({ data: { id: 7, imagen: '', nombre: 'Entretenimiento' } })
	await prisma.tiposGastos.create({ data: { id: 8, imagen: '', nombre: 'Comunicación' } })
	await prisma.tiposGastos.create({ data: { id: 9, imagen: '', nombre: 'Seguros' } })
	await prisma.tiposGastos.create({ data: { id: 10, imagen: '', nombre: 'Deudas' } })
	await prisma.tiposGastos.create({ data: { id: 11, imagen: '', nombre: 'Ropa y Calzado' } })
	await prisma.tiposGastos.create({ data: { id: 12, imagen: '', nombre: 'Cuidado Personal' } })
	await prisma.tiposGastos.create({ data: { id: 13, imagen: '', nombre: 'Impuestos' } })
	await prisma.tiposGastos.create({ data: { id: 14, imagen: '', nombre: 'Mascotas' } })
	await prisma.tiposGastos.create({ data: { id: 15, imagen: '', nombre: 'Viajes' } })

	console.log('end-------------------------------------')
}

seeding()
