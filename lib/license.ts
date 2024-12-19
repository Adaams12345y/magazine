export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments = 4
  const segmentLength = 4
  
  const key = Array(segments)
    .fill(0)
    .map(() => 
      Array(segmentLength)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('')
    )
    .join('-')
    
  return key
}

