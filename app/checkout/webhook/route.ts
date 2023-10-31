import { db } from '../../../lib/drizzle'
import { paddle as paddleSchema } from '../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    const event = await request.json()

    switch (event.event_type) {
      case 'subscription.created':
        onSubscriptionCreated(event)
        break
      case 'subscription.updated':
        onSubscriptionUpdated(event)
        break
      case 'transaction.completed':
        onTransactionCompleted(event)
        break
    }
  } catch (e) {
    return Response.json({ fail: true })
  }

  return Response.json({ success: true })
  
}

async function onSubscriptionCreated(event: any) {
  // Create a new subscription record in our database
  if (!event.data.custom_data.userId) { throw new Error('No userId coming in subscription.created ' + event.data.id) }
  const userId = event.data.custom_data.userId
  let paddle = await db.query.paddle.findFirst({ where: (paddle, { eq }) => eq(paddle.userId, userId) })
  if (paddle) {
    // This should never happen
    throw new Error('The user already has a paddle record ' + userId)
  }
  const nextBilledAt = new Date(event.data.next_billed_at)
  
  try {
    await db.insert(paddleSchema).values({
      userId,
      customer_id: event.data.customer_id,
      status: event.data.status,
      next_billed_at: nextBilledAt
    })
  } catch (error) {
    throw new Error('Error inserting paddle record ' + error)
  }

  return true;
}

async function onSubscriptionUpdated(event: any) {
  // Take care of cases where subscription is canceled, paused, etc.
  if (!event.data.custom_data.userId) { throw new Error('No userId coming in subscription.created ' + event.data.id) }
  const userId = event.data.custom_data.userId
  let paddle = await db.query.paddle.findFirst({ where: (paddle, { eq }) => eq(paddle.userId, userId) })
  if (!paddle) {
    // This should never happen
    throw new Error('Paddle record not found for the user ' + userId)
  }
  const nextBilledAt = new Date(event.data.next_billed_at)
  
  try {
    await db.update(paddleSchema).set({
      status: event.data.status,
      next_billed_at: nextBilledAt
    }).where(eq(paddleSchema.userId, userId))
  } catch (error) {
    throw new Error('Error updating paddle record ' + error)
  }

  return true;
}

async function onTransactionCompleted(event: any) {
  // Update user's credits for the current billing cycle
  //console.log('Tranasction completed ', event)
}
