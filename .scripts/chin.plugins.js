import React from 'react'
import { markdownToHtml } from 'lonogara-sdk/build'
import chinPluginsInkscape from 'chin-plugins-inkscape'
import chinPluginsImagemin from 'chin-plugins-imagemin'
import chinPluginsHtmlEmbed from 'chin-plugins-html-embed'

const MarkdownToHtml = opts => {
  opts.ext = '.html'
  return data => markdownToHtml(data)
}

export default Object.assign({},
  { MarkdownToHtml },
  chinPluginsInkscape(),
  chinPluginsImagemin({}),
  chinPluginsHtmlEmbed({
    out: 'index.html',
    env: {
      "DEVELOPMENT": {
        props: ['onerror.js'],
        component: (props) =>
        <html lang="ja">
          <head>
            {props['onerror.js']}
          </head>
          <body>
            <div id="app" />
            <script src="./dll.js" />
            <script src="./bundle.js" />
          </body>
        </html>
      },
      "PRODUCTION:LIGHT": {
        props: ['onerror.js'],
        component: (props) =>
        <html lang="ja">
          <head>
            {props['onerror.js']}
          </head>
          <body>
            <div id="app" />
            <script src="./bundle.js" />
          </body>
        </html>
      },
      "PRODUCTION:MASTER": {
        props: [
          'favicons.png',
          'ganalytics.js'
        ],
        component: (props) =>
          <html lang="ja">
            <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
              <title></title>
              <meta charSet="utf-8" />
              <meta name="keywords" content="" />
              <meta name="description" content="" />
              <meta name="fragment" content="!" />
              <meta property="og:type" content="website" />
              <meta property="og:locale" content="ja_JP" />
              <meta property="og:url" content="" />
              <meta property="og:site_name" content="" />
              <meta property="og:image" content="" />
              <meta property="og:title" content="" />
              <meta property="og:description" content="" />
              {props['favicons.png']}
              {props['ganalytics.js']}
            </head>
            <body>
              <div id="app" />
              <script src="./bundle.js" />
            </body>
          </html>,
        EmbedFavicons: {
          appName: '',
          path: 'favicons',
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
          }
        },
      }
    }
  })
)