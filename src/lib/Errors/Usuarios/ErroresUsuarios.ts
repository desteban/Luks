import ErrorHash from '@/lib/Encriptacion/ErrorHash'
import { UserDuplicated, UserNotFound } from '..'
import ErrorCompararHash from '@/lib/Encriptacion/ErrorCompararHash'
import { ActuaizarUsuarioType } from '@/Modules/Usuarios/Schemas/ActualizarUsuario.Schema'
import { ServerError } from '../ServerError'

export type ErroresUsuarios =
	| UserDuplicated
	| UserNotFound
	| ErrorHash
	| ErrorCompararHash
	| ActuaizarUsuarioType
	| ServerError
