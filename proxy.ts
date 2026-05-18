import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = request.cookies.get('accessToken')?.value
    const role = request.cookies.get('role')?.value

    const isAdminPage = pathname.startsWith('/admin')
    const isCustomerPage = pathname.startsWith('/customer')
    const isLoginPage = pathname === '/sign-in'

    if ((isAdminPage || isCustomerPage) && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (isLoginPage && token) {
        if (role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
        if (role === 'CUSTOMER') {
            return NextResponse.redirect(new URL('/customer/dashboard', request.url))
        }
    }

    if (isAdminPage && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (isCustomerPage && role !== 'CUSTOMER') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/customer/:path*', '/sign-in'],
}