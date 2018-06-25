import inkscape from 'chin-plugin-inkscape'
import favicons from 'chin-plugin-favicons'
import unified from 'chin-plugin-unified'
import imagemin from 'chin-plugin-imagemin'
import presetM2H from 'lonogara-sdk/unified/m2h'
import { outputFile } from 'fs-extra'
import { join } from 'path'
import indexHTML, { TITLE } from './chin.indexHTML.js'
import { devdir, prodir } from './.variables.js'

/* extensions */
const ink2pdf = inkscape('pdf')
const ink2png = inkscape('png', { width: 1024, background: '#ffffff' })
const md2html = unified('.html', presetM2H())
const img2min = imagemin({
  gifsicle: {},
  jpegtran: {},
  optipng: {},
  svgo: {}
})
const svg2fav = favicons({
  nameAsDir: true,
  config: {
    path: 'favicons',
    appName: TITLE
  }
})

/* configs */

const assets = 'frame'

const ignoredExMaster = [
  '_redirects',
  'favicons.svg',
  '**.txt',
  '**.xml'
]

const commonProcessors = {
  md: md2html,
  png: img2min,
  jpg: img2min,
  svg: img2min
}

const configs = {
  'pre': {
    put: 'preframe',
    out: assets,
    processors: [
      ['pdf', { svg: ink2pdf }],
      ['*', { svg: ink2png }]
    ]
  },
  'dev': {
    put: assets,
    out: devdir,
    ignored: ignoredExMaster,
    processors: commonProcessors
  },
  'mir': {
    put: assets,
    out: prodir,
    ignored: ignoredExMaster,
    processors: [
      ['favicons.svg', { svg: svg2fav }],
      ['*', commonProcessors]
    ],
    before: () => outputFile(
      join(prodir, 'index.html'),
      indexHTML('mir', svg2fav.after())
    )
  },
  'pro': {
    put: assets,
    out: prodir,
    processors: [
      ['favicons.svg', { svg: svg2fav }],
      ['*', commonProcessors]
    ],
    after: () => outputFile(
      join(prodir, 'index.html'),
      indexHTML('pro', svg2fav.after())
    )
  }
}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
export default configs[suffix]