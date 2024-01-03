export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    //'/((?!api|$|checkout/webhook|_next/static|_next/image|favicon.ico).*)',
  ]
}