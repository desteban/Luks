import ErrorHash from '@/lib/Encriptacion/ErrorHash'
import { UserDuplicated, UserNotFound } from '..'
import ErrorCompararHash from '@/lib/Encriptacion/ErrorCompararHash'

export type ErroresUsuarios = UserDuplicated | UserNotFound | ErrorHash | ErrorCompararHash
