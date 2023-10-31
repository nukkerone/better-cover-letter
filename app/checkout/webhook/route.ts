import { db } from '../../../lib/drizzle'

export async function POST(request: Request) {

  try {
    const body = await request.json()
    console.log('Body ', body)

    switch (body.event_type) {
      case 'subscription.created':
        return onSubscriptionCreated()
      case 'subscription.updated':
        return onSubscriptionUpdated()
      case 'tranasction.completed':
        return onTransactionCompleted()
    }
  } catch (e) {

  }


  return Response.json({ fail: true })
}

function onSubscriptionCreated() {
  // Create a new subscription record in our database
}

function onSubscriptionUpdated() {
  // Take care of cases where subscription is canceled, paused, etc.
}

function onTransactionCompleted() {
  // Update user's credits for the current billing cycle
}
