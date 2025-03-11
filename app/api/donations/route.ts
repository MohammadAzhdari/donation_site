import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Named export for GET method
export async function GET() {
  try {
    const donations = db.prepare('SELECT * FROM donations ORDER BY created_at DESC').all();
    return NextResponse.json([{id:1, amount:1,comment:'asdsad'}]);
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