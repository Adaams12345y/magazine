import { NextResponse } from 'next/server'
import { register } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { username, email, password, licenseKey, hwid } = await req.json()
    
    // Verify license key
    const license = await db.getLicenseByKey(licenseKey)
    if (!license) {
      return NextResponse.json(
        { error: 'Invalid license key' },
        { status: 400 }
      )
    }
    if (license.used) {
      return NextResponse.json(
        { error: 'License key already used' },
        { status: 400 }
      )
    }

    const user = await register(username, email, password)
    
    // Mark license as used
    await db.useLicense(licenseKey, user.id, hwid)
    
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}

