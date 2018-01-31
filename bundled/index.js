import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Mobile, Desktop } from 'lonogara'
import Views from './views'

const rendering = (isMobile) => {

  const Lonogara = isMobile ? Mobile : Desktop

  render(
    <Fragment>
      <style>{``}</style>
      <Lonogara {...props(isMobile)} />
    </Fragment>,
    document.getElementById('app')
  )
}

const props = (isMobile) => ({
  // firstIndex: 0,
  views: Views(isMobile),
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
  links: []
})

window.addEventListener('load', () =>
  rendering(
    navigator
    .userAgent
    .toLowerCase()
    .includes('mobile')
  )
)

