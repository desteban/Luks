import { ExternalToast, toast } from 'sonner'

type tipos = 'error' | 'info' | 'warning' | 'success' | 'default'

interface props {
	tipo?: tipos
	mensaje: string
	propsToast?: ExternalToast
}

export default function AlertaToast({ mensaje, propsToast, tipo = 'default' }: props) {
	let propsCustomToast: ExternalToast | undefined = undefined

	if (tipo === 'error') {
		propsCustomToast = {
			style: {
				// border: '1px solid red',
				backgroundColor: 'hsl(0, 80%, 70%)',
				color: '#fefefe',
			},
		}
	}

	if (tipo === 'info') {
		propsCustomToast = {
			style: {
				// border: '1px solid red',
				backgroundColor: 'hsl(195, 60%, 90%)',
				// color: '#fefefe',
			},
		}
	}

	if (tipo === 'success') {
		propsCustomToast = {
			style: {
				backgroundColor: 'hsl(122, 70%, 80%)',
			},
		}
	}

	if (tipo === 'warning') {
		propsCustomToast = {
			style: {
				backgroundColor: 'hsl(45, 90%, 66%)',
				color: '#fefefe',
			},
		}
	}

	toast(mensaje, { ...propsCustomToast, ...propsToast })
}
