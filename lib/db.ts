async useLicense(key: string, userId: string, hwid: string): Promise<void> {
  const license = await this.getLicenseByKey(key)
  if (!license) throw new Error('Invalid license key')
  if (license.used) throw new Error('License key already used')

  license.used = true
  license.usedBy = userId

  const user = this.users.get(userId)
  if (user) {
    user.hwid = hwid
    user.keyUsed = key
    user.keyExpiresAt = license.expiresAt
  }
}

