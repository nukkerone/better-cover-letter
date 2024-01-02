'use client'

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from "react";

type Props = {
  userId: string
}

const Checkout = ({ userId }: Props) => {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT! as 'sandbox' | 'production',
      seller: parseInt(process.env.NEXT_PUBLIC_PADDLE_SELLER!) 
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  useEffect(() => {
    if (paddle && userId) {
      paddle.Checkout.open({
        items: [{ priceId: process.env.NEXT_PUBLIC_PADDLE_PRODUCT_PRICE_ID! }],
        customData: {
          userId
        }
      });
    }
  }, [paddle, userId])

  return <></>
}

export default Checkout
