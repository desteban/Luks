import { Nav } from '@/components/nav/Nav'
import DatosSession from './DatosSession'
import Card from '@/components/Card/Card'
import Container from '@/components/Container/Container'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import AhorroIcons from '@iconos/AhorroIcon'
import ReporteDoneroIcon from '@iconos/ReporteDineroIcon'
import { ReactNode } from 'react'
import estilos from './Estilos.module.css'
import { PlusIcon } from 'lucide-react'
import { BuscarListaIcon } from '@iconos/BuscarListaIcon'

export default async function Page() {
	const ItemsIngresos = () => {
		return (
			<AccordionItem value="Ingresos">
				<AccordionTrigger>
					<div className="flex gap-3 items-center">
						<AhorroIcons />
						<h2 className="m-0">Ingresos</h2>
					</div>
				</AccordionTrigger>

				<AccordionContent className={estilos.dual}>
					<BotonAcordion href="/ingreso/nuevo">
						<div>
							<div className="flex justify-center">
								<PlusIcon />
							</div>
							<p className={estilos['dual-item-texto']}>Agregar Ingreso</p>
						</div>
					</BotonAcordion>

					<BotonAcordion href="/ingreso">
						<div>
							<div className="flex justify-center">
								<BuscarListaIcon />
							</div>
							<p className={estilos['dual-item-texto']}>Ver Ingresos</p>
						</div>
					</BotonAcordion>
				</AccordionContent>
			</AccordionItem>
		)
	}

	const ItemsGastos = () => {
		return (
			<AccordionItem value="Gastos">
				<AccordionTrigger>
					<div className="flex gap-3 items-center">
						<ReporteDoneroIcon />
						<h2 className="m-0">Gastos</h2>
					</div>
				</AccordionTrigger>

				<AccordionContent className={estilos.dual}>
					<BotonAcordion href="/gastos/nuevo">
						<div>
							<div className="flex justify-center">
								<PlusIcon />
							</div>
							<p className={estilos['dual-item-texto']}>Agregar Gasto</p>
						</div>
					</BotonAcordion>

					<BotonAcordion href="/gastos">
						<div>
							<div className="flex justify-center">
								<BuscarListaIcon />
							</div>
							<p className={estilos['dual-item-texto']}>Ver Gastos</p>
						</div>
					</BotonAcordion>
				</AccordionContent>
			</AccordionItem>
		)
	}

	const BotonAcordion = ({ children, href }: { href: string; children: ReactNode }) => {
		return (
			<Link href={href}>
				<Card className={estilos['dual-item-card']}>
					<div className={estilos['dual-item']}>{children}</div>
				</Card>
			</Link>
		)
	}

	return (
		<main>
			<Nav />
			<Container>
				<div className="mt-4">
					<DatosSession />
				</div>

				<Card className="mb-4">
					<Accordion
						type="single"
						collapsible
					>
						<ItemsIngresos />

						<ItemsGastos />
					</Accordion>
				</Card>

				<Card>
					<h2>Tus movimientos</h2>
				</Card>
			</Container>
		</main>
	)
}
