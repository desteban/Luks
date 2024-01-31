import ErrorHash from '@/lib/Encriptacion/ErrorHash'
import { ErrorParseSchema, UserDuplicated, UserNotFound } from '..'
import ErrorCompararHash from '@/lib/Encriptacion/ErrorCompararHash'
import { ActuaizarUsuarioType } from '@/Modules/Usuarios/Schemas/ActualizarUsuario.Schema'
import { ServerError } from '../ServerError'
import { ActualizarUsuarioError } from './ActualizarUsuarioError'

export type ErroresUsuarios =
	| UserDuplicated
	| UserNotFound
	| ErrorHash
	| ErrorCompararHash
	| ActuaizarUsuarioType
	| ServerError
	| ErrorParseSchema
	| ActualizarUsuarioError
