import NextImage from 'next/image'

import logoMinSvg from '../data/logo.min.svg'

const Logo = () => {
  return (
    <NextImage
      src={logoMinSvg}
      alt="logo"
      className="h-[80px] w-[80px] rounded-br-[40px] rounded-tr-[40px]"
    />
  )
}

export default Logo
