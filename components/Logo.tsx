import NextImage from 'next/image'

import logoMinSvg from './logo.min.svg'

const Logo = () => {
  return (
    <NextImage src={logoMinSvg} alt="logo" height={75} width={75} className="rounded-br-[37px]" />
  )
}

export default Logo
