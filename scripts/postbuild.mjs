import rss from './rss.mjs'
import images from '../core/Images'

function postbuild() {
  rss()
  console.log('postbuild')
  console.log(images)
}

postbuild()
