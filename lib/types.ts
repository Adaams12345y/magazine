export interface License {
  id: string
  key: string
  productId: string
  duration: 'daily' | 'monthly' | 'lifetime'
  used: boolean
  usedBy?: string
  createdAt: Date
  expiresAt?: Date
}

