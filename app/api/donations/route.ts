import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Named export for GET method
export async function GET() {
  try {
    const donations = db.prepare('SELECT * FROM donations ORDER BY created_at DESC').all();
    //return NextResponse.json(donations);
    return NextResponse.json([
      { id: 1, amount: 50, comment: "Support for Ukraine", created_at: "2025-03-01" },
      { id: 2, amount: 100, comment: "Stay strong!", created_at: "2025-03-02" },
      { id: 3, amount: 75, comment: "Hope this helps", created_at: "2025-03-03" },
      { id: 4, amount: 200, comment: "Peace for Ukraine", created_at: "2025-03-04" },
      { id: 5, amount: 150, comment: "Praying for you", created_at: "2025-03-05" },
      { id: 6, amount: 80, comment: "Small help, big heart", created_at: "2025-03-06" },
      { id: 7, amount: 60, comment: "Solidarity with Ukraine", created_at: "2025-03-07" },
      { id: 8, amount: 120, comment: "Hope for peace", created_at: "2025-03-08" },
      { id: 9, amount: 50, comment: "With love from afar", created_at: "2025-03-09" },
      { id: 10, amount: 90, comment: "Keep fighting!", created_at: "2025-03-10" },
      { id: 11, amount: 110, comment: "For a better future", created_at: "2025-03-11" },
      { id: 12, amount: 130, comment: "Stay safe", created_at: "2025-03-12" },
      { id: 13, amount: 95, comment: "With all my support", created_at: "2025-03-13" },
      { id: 14, amount: 140, comment: "Love and strength", created_at: "2025-03-14" },
      { id: 15, amount: 160, comment: "Together we stand", created_at: "2025-03-15" },
      { id: 16, amount: 55, comment: "Every bit helps", created_at: "2025-03-16" },
      { id: 17, amount: 70, comment: "Never lose hope", created_at: "2025-03-17" },
      { id: 18, amount: 85, comment: "Peace and freedom", created_at: "2025-03-18" },
      { id: 19, amount: 180, comment: "We are with you", created_at: "2025-03-19" },
      { id: 20, amount: 200, comment: "Ukraine will prevail", created_at: "2025-03-20" }
    ]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

// Optional: Add other methods if needed
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}