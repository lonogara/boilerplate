import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Mobile, Desktop } from 'lonogara'
import Views from './Views'

window.addEventListener('load', () => {
  const isMobile = navigator.userAgent.toLowerCase().includes('mobile')
  const Lonogara = isMobile ? Mobile : Desktop
  render(
    <Fragment>
      <style>{``}</style>
      <Lonogara {...{
        // firstIndex: 0,
        Preloader: () => false,
        colors: {
          base: '',
          sub: '',
          links: '',
          detail: '',
          detailQuit: '',
          preloader: '',
          background: ''
        },
        background: ['', {}],
        links: [],
        views: Views(isMobile)
      }} />
    </Fragment>,
    document.getElementById('app')
  )
})