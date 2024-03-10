'use client'

import { Email } from 'react-obfuscate-email'

const ObfuscatedEmail = ({ emailAddress }) => {
  return <Email email={emailAddress} />
}

export default ObfuscatedEmail
