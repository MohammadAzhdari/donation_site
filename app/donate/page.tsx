'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const presetAmounts = [25, 50, 100, 250, 500];
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [tip, setTip] = useState('0.10');
  const [comment, setComment] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseFloat(customAmount);

    // const response = await fetch('/api/checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     amount: amount.toString(),
    //     tip,
    //     comment
    //   }),
    // });

    router.push('/success');

    // const { sessionId } = await response.json();
    // const stripe = await stripePromise;
    // await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Support Ukraine</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount(amount.toString());
              }}
              className={`p-4 rounded-xl transition-all cursor-pointer
                ${selectedAmount === amount
                  ? 'bg-yellow-400 text-blue-900 font-bold'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder="Or enter custom amount"
            className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-yellow-400"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            step="0.01"
            min="1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-blue-900">Tip (%)</label>
          <select
            className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-yellow-400"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          >
            <option value="0">0%</option>
            <option value="0.05">5%</option>
            <option value="0.10">10%</option>
            <option value="0.15">15%</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-blue-900">Comment (optional)</label>
          <textarea
            className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-yellow-400"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-4 rounded-xl font-bold text-lg transition-all cursor-pointer"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}