import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Nama dan Nomor HP wajib diisi' }, { status: 400 });
    }

    // Simpan ke database Supabase
    const user = await prisma.user.create({
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json({ message: 'Success', user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
