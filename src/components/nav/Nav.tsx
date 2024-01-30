'use client'

import estilos from './Estilos.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { Button } from '../ui/button'
import MenuIcon from '@iconos/MenuIcon'
import SalirIcon from '@iconos/SalirIcon'
import { UserIcon } from '@iconos/UserIcon'

export function Nav() {
	const { data } = useSession()
	const [session, setSession] = useState<Session | undefined>()
	const [mostrarMenu, setMostrarMenu] = useState<boolean>(false)

	useEffect(() => {
		setSession(data as Session)
	}, [data])

	const handleMenu = () => {
		setMostrarMenu(!mostrarMenu)
	}

	const CerrarSession = () => {
		signOut({ callbackUrl: '/' })
	}

	const Session = () => {
		if (session) {
			return (
				<div className="bg-slate-900 w-full pt-3 px-5 border-t-2 border-gray-50 flex flex-wrap gap-2 items-center pb-3">
					{session.user?.image ? (
						<img
							src={session.user?.image ?? ''}
							alt={`Imagen de ${session.user?.name}`}
							className="rounded-full h-10"
						/>
					) : (
						<UserIcon size={40} />
					)}

					<div className="">
						<h2 className="text-white mb-2 ml-0">Hola de regreso</h2>
						<p>
							<small>{session.user?.name}</small>
						</p>
					</div>
				</div>
			)
		}

		return (
			<div className="bg-slate-900 w-full pt-3 px-5 border-t-2 border-gray-50 flex flex-wrap gap-2 items-center">
				<UserIcon size={40} />
				<div className="">
					<h2 className="text-white mb-2 ml-0">Hola de regreso</h2>
					<p>
						<small>Aquí tu tienes el control de todo lo que haces</small>
					</p>
				</div>
				<div className="flex justify-between items-center pb-3 w-full gap-2">
					<Button
						className={`mt-4 w-full ${estilos.boton}`}
						onClick={() => signIn()}
					>
						Ingresar
					</Button>

					<Button className="mt-4 w-full bg-gray-400 text-black">
						<Link
							className="text-black"
							href={'/registro'}
							title="Registro"
						>
							Crear cuenta
						</Link>
					</Button>
				</div>
			</div>
		)
	}

	const Salir = () => {
		if (!session) {
			return null
		}

		return (
			<div className="bg-gray-200 text-black p-5 pt-2 border-t-2 border-zinc-400 flex flex-row-reverse">
				<Button
					variant={'outline'}
					onClick={CerrarSession}
				>
					<div className="flex items-center">
						<SalirIcon />
						Salir
					</div>
				</Button>
			</div>
		)
	}

	return (
		<header className={estilos.header}>
			<div className={estilos['header-contenido']}>
				<p className={estilos.nombre}>luks</p>
				<MenuIcon
					onClick={handleMenu}
					className="cursor-pointer"
				/>
			</div>

			<nav className={`rounded-xl ${mostrarMenu ? '' : 'hidden'} mb-5`}>
				<Session />

				<div className="bg-gray-200 text-black p-5">
					<ul>
						<li>Inicio</li>
						<li>Ingreso</li>
						<li>Gastos</li>
					</ul>
				</div>

				<Salir />
			</nav>
		</header>
	)
}
