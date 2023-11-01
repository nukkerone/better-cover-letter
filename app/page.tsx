import Generate from "@/components/generate"
import Nav from "@/components/nav"
import { authOptions } from "@/lib/auth"
import { db } from '@/lib/drizzle'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const paddle = await db.query.paddle.findFirst({ where: (paddle, { eq }) => eq(paddle.userId, session!.user.id) })
  const activePayment = paddle?.status === 'active'

  if (!activePayment) {
    redirect('/checkout')
  }

  return (
    <div className="flex flex-col p-24 pt-0 max-w-[1280px] min-h-screen">
      <Nav />

      <main className="flex flex-row flex-1 items-stretch justify-between gap-[24px]">
        <Generate />
      </main>
    </div>
  )
}
