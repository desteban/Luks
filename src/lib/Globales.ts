import { env } from 'process'

export const UrlApi: string = env.NEXT_PUBLIC_API ?? 'http://localhost:3000/api/'

export const RutasAPI = {
	usuarios: 'usuarios',
	UsuarioActual: 'usuarios/actual',
	gastos: 'gastos',
	ingresos: 'ingresos',
	tipos: {
		gastos: 'tipos/gastos',
	},
}
