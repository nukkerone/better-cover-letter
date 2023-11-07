import Checkout from "@/components/checkout"
import { authOptions } from "@/lib/auth"
import { db } from '@/lib/drizzle'
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

const CheckoutPage = async () => {
  const session = await getServerSession(authOptions)
  const paddle = await db.query.paddle.findFirst({ where: (paddle, { eq }) => eq(paddle.userId, session!.user.id) })
  const activePayment = paddle?.status === 'active'
  
  if (activePayment) {
    redirect('/')
  }

  return <>
    {session && !activePayment && <Checkout userId={session.user.id} />}
  </>
}

export default CheckoutPage
