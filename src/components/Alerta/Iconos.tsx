import { ErrorIcon } from '@iconos/ErrorIcon'
import { InfoIcon } from '@iconos/InfoIcon'
import { SuccessIcon } from '@iconos/SuccesIcon'
import { WarningIcon } from '@iconos/WarningIcon'
import { TiposAlert } from './Alerta'

interface props {
	tipoAlerta: TiposAlert
}

export function Iconos({ tipoAlerta }: props) {
	if (tipoAlerta === 'error') {
		return <ErrorIcon />
	}

	if (tipoAlerta === 'warning') {
		return <WarningIcon />
	}

	if (tipoAlerta === 'info') {
		return <InfoIcon />
	}

	if (tipoAlerta === 'success') {
		return <SuccessIcon />
	}

	return <InfoIcon />
}
