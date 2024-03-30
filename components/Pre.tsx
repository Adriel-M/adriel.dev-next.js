import { ReactNode } from 'react'

const Pre = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <pre>{children}</pre>
    </div>
  )
}

export default Pre
