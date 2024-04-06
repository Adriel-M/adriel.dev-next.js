import { slug } from 'github-slugger'

export class SluggedTag {
  readonly tag: string

  constructor(tag: string) {
    this.tag = slug(tag)
  }
}
