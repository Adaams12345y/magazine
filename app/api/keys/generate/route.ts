import { NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateLicenseKey } from '@/lib/license'

export async function POST(req: Request) {
  try {
    const user = await getUser()
    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId, duration } = await req.json()
    
    if (!productId || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const key = generateLicenseKey()
    
    const license = await db.createLicense({
      key,
      productId,
      duration,
      expiresAt: duration === 'lifetime' 
        ? undefined 
        : new Date(Date.now() + (
          duration === 'daily' 
            ? 24 * 60 * 60 * 1000 
            : 30 * 24 * 60 * 60 * 1000
        ))
    })

    return NextResponse.json({
      key: license.key,
      productId: license.productId,
      duration: license.duration,
      createdAt: license.createdAt.toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

