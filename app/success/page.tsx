import Link from 'next/link';
import Image from 'next/image';
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
  //if (!searchParams.session_id) redirect('/');

  try {
    // const session = await stripe.checkout.sessions.retrieve(
    //   searchParams.session_id
    // );
    
    // if (session.payment_status === 'paid') {
    //   const donationAmount = parseFloat(session.metadata?.donationAmount || '0');
    //   const tipAmount = donationAmount * parseFloat(session.metadata?.tipPercentage || '0');
    //   const comment = session.metadata?.comment || '';

    //   db.prepare(
    //     'INSERT INTO donations (amount, tip, comment) VALUES (?, ?, ?)'
    //   ).run(donationAmount, tipAmount, comment);
    // }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="animate-bounce mb-6">
            <Image
              src="/heart.png"
              alt="Love Heart"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your donation was successfully processed. Together we're making a difference
            in the lives of people affected by the crisis in Ukraine.
          </p>
          <Link href="/">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-xl font-bold transition-all cursor-pointer">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    );
  } catch (err) {
    redirect('/');
  }
}