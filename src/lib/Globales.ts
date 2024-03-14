export const UrlApi: string = process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api/'

export const RutasAPI = {
	usuarios: 'usuarios',
	UsuarioActual: 'usuarios/actual',
	gastos: 'gastos',
	ingresos: 'ingresos',
	tipos: {
		gastos: 'tipos/gastos',
		ingresos: 'tipos/ingresos',
	},
	dashboard: 'dashboard',
}
