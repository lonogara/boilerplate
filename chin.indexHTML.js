import unified from 'unified'
import html2hast from 'rehype-parse'
import hastformat from 'rehype-format'
import hast2html from 'rehype-stringify'
import h2r from 'react-html-parser'
import { transform as babelTransform } from 'babel-core'
import React, { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const TITLE = ''

const GA_ID = ''

const DESCRIPTION =
'' +
''

const ogs = <Fragment>
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:url" content="" />
  <meta property="og:site_name" content="" />
  <meta property="og:image" content="" />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content="" />
</Fragment>

const createScriptWithBabel = (code) =>
  createElement('script', {
    dangerouslySetInnerHTML: {
      __html: babelTransform(code, {
        compact: true,
        minified: true,
        comments: false
      }).code
    }
  })

const ga = createScriptWithBabel(`
  ;(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function() {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  ga('create', '${GA_ID}', 'auto')
  ga('send', 'pageview')
`)

const onerror = createScriptWithBabel(`
  window.onerror = e => {
    console.error(e)
    document.body.removeChild(document.getElementById('app'))
    const div = document.createElement('div')
    div.innerText = e
    div.style.fontSize = '40px'
    document.body.appendChild(div)
  }
`)

const Head = ({ children }) =>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  {children}
</head>

const MirIndexHtml = ({ favicons }) =>
<html lang="ja">
  <Head>
    {ogs}
    {favicons}
    {onerror}
    <script defer={true} src="./bundle.js" />
  </Head>
  <body>
    <div id="app" />
  </body>
</html>

const ProIndexHtml = ({ favicons }) =>
<html lang="ja">
  <Head>
    <title>{TITLE}</title>
    <meta charSet="utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content={DESCRIPTION} />
    <meta name="fragment" content="!" />
    {ogs}
    {favicons}
    {ga}
    <script defer={true} src="./bundle.js" />
  </Head>
  <body>
    <div id="app" />
  </body>
</html>

export default (type, faviconsElements) =>
unified()
.use([
  html2hast,
  hastformat,
  hast2html
])
.processSync(
  '<!DOCTYPE html>' +
  renderToStaticMarkup(
    type === 'mir' ? <MirIndexHtml favicons={h2r(faviconsElements.join(''))} /> :
    type === 'pro' ? <ProIndexHtml favicons={h2r(faviconsElements.join(''))} />
    : false
  )
)
.contents