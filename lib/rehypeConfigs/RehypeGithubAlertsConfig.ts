import octicons from '@primer/octicons'
import { IOptions } from 'rehype-github-alerts'

const config: IOptions = {
  alerts: [
    {
      keyword: 'NOTE',
      icon: octicons.info.toSVG(),
      title: 'Note',
    },
    {
      keyword: 'IMPORTANT',
      icon: octicons.report.toSVG(),
      title: 'Important',
    },
    {
      keyword: 'WARNING',
      icon: octicons.alert.toSVG(),
      title: 'Warning',
    },
    {
      keyword: 'TIP',
      icon: octicons['light-bulb'].toSVG(),
      title: 'Tip',
    },
    {
      keyword: 'CAUTION',
      icon: octicons.stop.toSVG(),
      title: 'Caution',
    },
  ],
  supportLegacy: false,
}

export default config
