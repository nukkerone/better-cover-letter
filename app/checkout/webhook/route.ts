
export async function POST(request: Request) {

  try {
    const body = await request.json()
    console.log('Body ', body)

    switch (body.event_type) {
      case 'subscription.created':
        return onSubscriptionCreated()
      case 'subscription.created':
        return onSubscriptionCreated()
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