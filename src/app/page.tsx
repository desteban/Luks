import estilos from './estilos.module.css'
import { Nav } from '@/components/nav/Nav'
import Container from '@/components/Container/Container'
import Link from 'next/link'

export default function Home() {
	return (
		<main>
			<section
				aria-label="banner"
				className={`${estilos.banner}`}
			>
				<Nav className="sticky top-0 z-20" />
				<div className="z-10 px-5 py-6">
					<Container>
						<h1>¡Toma el control!</h1>
						<p className="">
							Controlar tus finanzas nunca ha sido tan fácil. <strong>Luks</strong> es tu compañero ideal para gestionar
							tus gastos e ingresos de manera eficiente y mantener tus finanzas bajo control.
						</p>
						<div className="absolute bottom-6 left-0 w-full flex gap-2 justify-center ">
							<Link
								href={'/registro'}
								title="Registro"
								className="h-11 rounded-md px-8 text-white bg-primary flex items-center"
							>
								¡Regístrate!
							</Link>

							<Link
								href={'/login'}
								title="Login"
								className="h-11 rounded-md px-8 text-primary border-primary border-[3px] bg-white opacity-65 flex items-center"
							>
								Ingresar
							</Link>
						</div>
					</Container>
				</div>
				<div className={estilos.fondo}></div>
			</section>

			<Container>
				<section
					aria-label="quienes somos"
					className="mb-14"
				>
					<h2 className="font-semibold">¡Bienvenido a Luks!</h2>

					<p>
						Controlar tus finanzas nunca ha sido tan fácil. Luks es tu compañero ideal para gestionar tus gastos e
						ingresos de manera eficiente y mantener tus finanzas bajo control.
					</p>

					<p>
						Con nuestra aplicación web intuitiva y fácil de usar, podrás registrar tus gastos e ingresos en segundos. Ya
						no tendrás que preocuparte por perder el rastro de tus transacciones financieras.
					</p>
				</section>

				<section
					aria-label="características principales"
					className="mb-14"
				>
					<h3>Características principales:</h3>

					<ul className="mb-4">
						<li>
							{' '}
							<strong>Módulo de Gastos</strong>: Registra tus gastos diarios de manera rápida y sencilla. Categoriza tus
							gastos para un mejor seguimiento y análisis.
						</li>
						<li>
							<strong>Módulo de Ingresos</strong>: Mantén un registro preciso de tus ingresos y asegúrate de estar al
							tanto de todas tus fuentes de ingresos.
						</li>
						<li>
							<strong>Dashboard Personalizado</strong>: Obtén una visión clara de tu situación financiera con nuestro
							dashboard personalizado. Visualiza gráficos que muestran tus gastos e ingresos de los últimos 4 meses, así
							como los 6 gastos más significativos del mes actual.
						</li>
					</ul>
				</section>

				<section aria-label="mas información">
					<p>
						Luks está diseñado para adaptarse a tus necesidades financieras, brindándote las herramientas necesarias
						para tomar decisiones informadas sobre tus finanzas personales.
					</p>

					<p>
						¡Únete a la comunidad de usuarios satisfechos de Luks y comienza tu viaje hacia una gestión financiera más
						inteligente y eficaz hoy mismo!
					</p>

					<p>
						¡
						<Link
							href={'/registro'}
							title="Registro"
						>
							Regístrate ahora
						</Link>{' '}
						y toma el control de tus finanzas con Luks!
					</p>
				</section>
			</Container>
		</main>
	)
}
