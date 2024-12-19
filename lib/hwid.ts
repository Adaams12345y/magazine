export async function generateHWID(): Promise<string> {
  // In a real implementation, you'd use various system identifiers
  // For this demo, we'll generate a random string
  return Math.random().toString(36).slice(2)
}

