import ErrorHash from '@/lib/Encriptacion/ErrorHash'
import { UserDuplicated, UserNotFound } from '..'

export type ErroresUsuarios = UserDuplicated | UserNotFound | ErrorHash
