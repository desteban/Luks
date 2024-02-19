import { ReactNode } from 'react'
import estilos from './Estilos.module.css'

interface props {
	children: ReactNode
}
export default function Container({ children }: props) {
	return <div className={estilos['container-app']}>{children}</div>
}
