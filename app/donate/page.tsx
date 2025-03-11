"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState("0");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, tip, comment }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>

        <div className="mb-4">
          <label className="block mb-2">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tip (%)</label>
          <select
            className="w-full p-2 border rounded"
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
          <label className="block mb-2">Comment (optional)</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
