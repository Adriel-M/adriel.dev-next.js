'use client'

import { Email } from 'react-obfuscate-email'

import siteMetadata from '@/data/siteMetadata'

const ObfuscatedEmail = () => {
  const email = siteMetadata.emailAddress ?? 'place@holder.com'
  return <Email email={email} />
}

export default ObfuscatedEmail
