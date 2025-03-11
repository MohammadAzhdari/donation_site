'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Donation {
  id: number;
  amount: number;
  tip: number;
  comment: string;
  created_at: string;
}

export default function Home() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Support Ukraine Humanitarian Relief</h1>
        <p className="text-gray-700 mb-4">
          Your donation will help provide essential supplies to those affected by the crisis.
        </p>
      </div>

      {/* Sidebar */}
      <div className="w-96 bg-white p-6 shadow-lg">
        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Share
          </button>
          <Link href="/donate">
            <span className="block w-full bg-green-600 text-white py-2 rounded text-center hover:bg-green-700">
              Donate Now
            </span>
          </Link>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
            {donations.map(donation => (
              <div key={donation.id} className="mb-3 p-3 bg-gray-50 rounded">
                <div className="font-medium">${donation.amount.toFixed(2)}</div>
                {donation.comment && <p className="text-gray-600 mt-1">"{donation.comment}"</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}