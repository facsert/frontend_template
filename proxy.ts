import { NextRequest, NextResponse } from "next/server"


export default function proxy(req: NextRequest) {
  const token = req.cookies.get("Authorization")
  const loginUrl = new URL("/login", req.url)
  if (!token) {
    // console.log("check login failed")
    return NextResponse.redirect(loginUrl)
  }
  
  // console.log(`token: ${token.value}`)
  const headers = new Headers(req.headers)
  headers.set("Authorization", token.value)
  const response = NextResponse.next({
    request: { headers: headers }
  })
  return response
};

export const config = {
  matcher: [
    '/pages/:path*',
    '/((?!login|sign|api|_next/static|_next/image|.*\\.png$).*)',
  ]
}
