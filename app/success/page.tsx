import { redirect } from 'next/navigation';
import db from '@/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //apiVersion: '2023-08-16',
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  if (!searchParams.session_id) redirect('/');

  try {
    const session = await stripe.checkout.sessions.retrieve(
      searchParams.session_id
    );
    
    if (session.payment_status === 'paid') {
      const donationAmount = parseFloat(session.metadata?.donationAmount || '0');
      const tipAmount = donationAmount * parseFloat(session.metadata?.tipPercentage || '0');
      const comment = session.metadata?.comment || '';

      db.prepare(
        'INSERT INTO donations (amount, tip, comment) VALUES (?, ?, ?)'
      ).run(donationAmount, tipAmount, comment);
    }

    redirect('/');
  } catch (err) {
    redirect('/');
  }
}