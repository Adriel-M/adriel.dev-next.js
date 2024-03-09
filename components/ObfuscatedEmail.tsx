'use client'

import { Email } from 'react-obfuscate-email'
import siteMetadata from '@/data/siteMetadata'

const ObfuscatedEmail = () => {
  const email = siteMetadata.emailAddress

  if (email) {
    return <Email email={email} />
  }
}

export default ObfuscatedEmail
