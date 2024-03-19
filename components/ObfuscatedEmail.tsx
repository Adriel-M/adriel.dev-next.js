'use client'

import { Email } from 'react-obfuscate-email'

const ObfuscatedEmail = ({ emailAddress }: { emailAddress?: string }) => {
  return <Email email={emailAddress ?? 'place@holder.com'} />
}

export default ObfuscatedEmail
