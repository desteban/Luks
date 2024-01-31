import Card from '@/components/Card/Card'
import Input from '@/components/Input/Inputs'
import TemplateMenu from '@/components/Templates/TemplateMenu'
import { Button } from '@/components/ui/button'
import BanerUsuario from './BanerUsuario'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Password from '@/components/Input/Password'

export default async function Page() {
	return (
		<TemplateMenu>
			<section aria-label="Datos personales">
				<Card className="mb-4">
					<BanerUsuario />
				</Card>

				<Card>
					<h2>Información de la cuenta</h2>
					<form className="mb-3">
						<div className="campo-doble-adaptable">
							<Input
								id="nombre"
								label="Nombre"
								name="nombre"
								placeHolder="Nombre"
								required
							/>

							<Input
								id="apellido"
								label="Apellido"
								placeHolder="Apellido"
								name="apellido"
							/>
						</div>

						<Input
							id="correo"
							name="correo"
							label="Correo"
							placeHolder="Correo"
							className="mb-5"
							required
						/>

						<Input
							id="usuario"
							name="usuario"
							label="Nombre de usuario"
							placeHolder="Nombre de usuario"
							className="mb-5"
						/>

						<Button className="w-full">Crear</Button>
					</form>
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
							<AccordionTrigger>Información de la cuenta</AccordionTrigger>
							<AccordionContent>
								<form className="mb-3">
									<h2>Información de la cuenta</h2>
									<div className="campo-doble-adaptable">
										<Input
											id="nombre"
											label="Nombre"
											name="nombre"
											placeHolder="Nombre"
											required
										/>

										<Input
											id="apellido"
											label="Apellido"
											placeHolder="Apellido"
											name="apellido"
										/>
									</div>

									<Input
										id="correo"
										name="correo"
										label="Correo"
										placeHolder="Correo"
										className="mb-5"
										required
									/>

									<Input
										id="usuario"
										name="usuario"
										label="Nombre de usuario"
										placeHolder="Nombre de usuario"
										className="mb-5"
									/>

									<Button className="w-full">Crear</Button>
								</form>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="seguridad">
							<AccordionTrigger>Seguridad</AccordionTrigger>
							<AccordionContent>
								<form>
									<Password
										id="oldPassword"
										name="oldPassword"
										label="Contraseña antigua"
										placeHolder="Contraseña antigua"
										required
										className="mb-7"
									/>

									<Password
										id="password"
										name="password"
										label="Contraseña nueva"
										placeHolder="Contraseña nueva"
										required
										className="mb-7"
									/>

									<Password
										id="confirmPassword"
										name="confirmPassword"
										label="Confirmar contraseña"
										placeHolder="Confirmar contraseña"
										required
										className="mb-7"
									/>
								</form>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</Card>
			</section>
		</TemplateMenu>
	)
}
