import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

export const config = { matcher: ['/inicio', '/gastos/:path*', '/ingresos/:path*'] }
