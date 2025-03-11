"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShareModal } from '@/components/share-modal';
import { useEffect, useState } from 'react';

interface Donation {
  id: number;
  amount: number;
  tip: number;
  comment: string;
  created_at: string;
}

export default function Home() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Image
            src="/logo.png"
            alt="Help Ukraine"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-xl font-bold">Ukraine Humanitarian Aid</h1>
        </div>
      </nav>

      <div className="container mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-none">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Together We Can Make a Difference
              </h2>
              <div className="relative h-100 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/ukraine_banner.jpg"
                  alt="Ukraine Map"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Since the escalation of conflict in Ukraine, millions of people
                have been forced to flee their homes. Your support helps provide:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Emergency food and water supplies</li>
                <li>Medical assistance and medicines</li>
                <li>Shelter and hygiene kits</li>
                <li>Emergency food and water supplies</li>
                <li>Medical assistance and medicines</li>
                <li>Shelter and hygiene kits</li>
                <li>Psychological support services</li>
              </ul>
              <p className="text-gray-700 text-lg">
                Every dollar makes a difference. Join us in supporting Ukrainian
                families during this critical time.
              </p>
            </div>
          </div>

          {/* Responsive Sidebar */}
          <div className="w-full lg:w-96 order-2 lg:order-none">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="flex flex-col gap-4 mb-8">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShareIcon className="w-5 h-5" />
                  Share Campaign
                </button>
                <Link
                  href="/donate"
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 rounded-lg font-bold transition-all text-center block"
                >
                  Donate Now
                </Link>
              </div>

              <h3 className="text-xl font-bold text-blue-900 mb-4">Recent Supporters</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {donations.map(donation => (
                  <div key={donation.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-blue-900">${donation.amount.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {donation.comment && (
                      <p className="text-gray-600 italic">"{donation.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal show={showShareModal} onClose={() => setShowShareModal(false)} />
    </div>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}