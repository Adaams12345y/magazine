import { NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const user = await getUser()
    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const licenses = await db.getAllLicenses()
    
    const keys = licenses.map(license => ({
      key: license.key,
      productId: license.productId,
      duration: license.duration,
      createdAt: license.createdAt.toISOString()
    }))

    return NextResponse.json({ keys })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

