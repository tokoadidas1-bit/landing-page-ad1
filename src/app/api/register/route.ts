import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Nama dan nomor telepon wajib diisi' },
        { status: 400 }
      )
    }

    const registration = await db.registration.create({
      data: {
        name,
        phone,
      },
    })

    return NextResponse.json({ success: true, data: registration })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const registrations = await db.registration.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ data: registrations })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data' },
      { status: 500 }
    )
  }
}
