import { NextRequest, NextResponse } from "next/server"


export default function proxy(req: NextRequest) {
  const token = req.cookies.get("Authorization")
  const loginUrl = new URL("/login", req.url)
  if (!token) {
    return NextResponse.redirect(loginUrl)
  }
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/pages", req.url))
  }
  return NextResponse.next()
};

export const config = {
  matcher: [
    '/pages/:path*',
    '/((?!login|sign|api|_next/static|_next/image|.*\\.png$).*)',
  ]
}
