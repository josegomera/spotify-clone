import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // TOKEN WILL EXIST IF THE USER IS LOGGED IN
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl;

    // ALLOW THE REQUESTS IF THE FOLLOWING US TRUE:
    // 1) Its a request for the nest-auth session & provider
    // 2) the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // REDIRECT THEM TO LOGIN IF THET DONT HAVE TOKEN & ARE REQUESTING A PROTECTED ROUTE
    if (!token && pathname !== '/login') {
        return NextResponse.rewrite(new URL('/login', req.url))
    }
}