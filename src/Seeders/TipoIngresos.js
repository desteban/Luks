const { PrismaClient } = require('@prisma/client')

async function seeding() {
	// import prisma from '../lib/Prisma'
	let prisma = new PrismaClient()

	console.log('seedin Tipos Ingresos')

	await prisma.tiposIngresos.create({ data: { id: 1, imagen: '', nombre: 'Otros', descrip: null } })
	await prisma.tiposIngresos.create({
		data: { id: 2, imagen: '', nombre: 'Salario', descrip: 'El pago regular recibido por trabajar en un empleo.' },
	})
	await prisma.tiposIngresos.create({
		data: {
			id: 3,
			imagen: '',
			nombre: 'Trabajo Independiente',
			descrip: 'Ganancias obtenidas a través de actividades profesionales o comerciales por cuenta propia.',
		},
	})
	await prisma.tiposIngresos.create({
		data: { id: 4, imagen: '', nombre: 'Alquiler', descrip: 'Dinero recibido por alquilar una propiedad.' },
	})
	await prisma.tiposIngresos.create({
		data: {
			id: 5,
			imagen: '',
			nombre: 'Intereses',
			descrip:
				'Ganancias generadas por tener dinero depositado en cuentas de ahorro o invertido en productos financieros.',
		},
	})
	await prisma.tiposIngresos.create({
		data: { id: 6, imagen: '', nombre: 'Pension', descrip: 'Pagos regulares recibidos tras jubilarse' },
	})
	await prisma.tiposIngresos.create({
		data: {
			id: 7,
			imagen: '',
			nombre: 'Ventas',
			descrip: 'Dinero obtenido por vender bienes o servicios, ya sea a tiempo completo o como ingreso adicional.',
		},
	})
	await prisma.tiposIngresos.create({
		data: {
			id: 8,
			imagen: '',
			nombre: 'Bonos',
			descrip:
				'Pagos adicionales otorgados por el empleador en función del desempeño, metas alcanzadas u otros criterios.',
		},
	})
	await prisma.tiposIngresos.create({
		data: {
			id: 9,
			imagen: '',
			nombre: 'Comisiones',
			descrip: ' Ganancias obtenidas por vender productos o servicios y recibir una parte del valor total de la venta.',
		},
	})

	console.log('end-------------------------------------')
}

seeding()
