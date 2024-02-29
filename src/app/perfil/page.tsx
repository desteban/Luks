import Card from '@/components/Card/Card'
import Input from '@/components/Input/Inputs'
import TemplateMenu from '@/components/Templates/TemplateMenu'
import { Button } from '@/components/ui/button'
import BanerUsuario from './BanerUsuario'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Password from '@/components/Input/Password'
import Link from 'next/link'
import Opciones from './Opciones'
import EscudoCandado from '@iconos/EscudoCandado'
import { InfoUsuario } from '@iconos/InfoUsuario'
export default async function Page() {
	return (
		<TemplateMenu>
			<section aria-label="Datos personales">
				<Card className="mb-4">
					<BanerUsuario />
				</Card>
			</section>

			<section
				aria-label="Cambiar contraseña"
				className="mt-8"
			>
				<Card>
					<Accordion
						type="single"
						collapsible
						className="w-full"
					>
						<AccordionItem value="info">
							<AccordionTrigger>
								<div className="flex items-center gap-3">
									<InfoUsuario />
									Información de la cuenta
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<Opciones />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="seguridad">
							<AccordionTrigger>
								<div className="flex items-center gap-3">
									<EscudoCandado />
									Seguridad
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<form>
									<Password
										id="oldPassword"
										name="oldPassword"
										label="Contraseña antigua"
										placeholder="Contraseña antigua"
										required
										className="mb-7"
									/>

									<Password
										id="password"
										name="password"
										label="Contraseña nueva"
										placeholder="Contraseña nueva"
										required
										className="mb-7"
									/>

									<Password
										id="confirmPassword"
										name="confirmPassword"
										label="Confirmar contraseña"
										placeholder="Confirmar contraseña"
										required
										className="mb-7"
									/>

									<Link href="/recuperar">¿Olvidaste la contraseña?</Link>

									<Button className="w-full mt-3">Actualizar</Button>
								</form>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</Card>
			</section>
		</TemplateMenu>
	)
}
