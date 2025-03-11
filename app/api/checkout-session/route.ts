'use server';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //apiVersion: '2023-08-16',
});

// Named export for POST method
export async function POST(request: Request) {
  try {
    const { amount, tip, comment } = await request.json();
    
    const donationAmount = parseFloat(amount);
    const tipPercentage = parseFloat(tip);
    const total = (donationAmount * (1 + tipPercentage)) * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Ukraine Humanitarian Donation' },
          unit_amount: Math.round(total),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        donationAmount: donationAmount.toString(),
        tipPercentage: tipPercentage.toString(),
        comment: comment,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

// Optional: Add other methods if needed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}