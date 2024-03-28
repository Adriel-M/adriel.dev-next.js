import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const TableWrapper = ({ children }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
