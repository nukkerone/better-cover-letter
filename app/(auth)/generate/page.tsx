import Generate from "@/components/generate"
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
    <main className="flex min-h-screen flex-row items-stretch justify-between p-24 max-w-[1280px] gap-[24px] m-auto">
      <Generate />
    </main>
  )
}
