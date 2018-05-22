import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Mobile, Desktop } from 'lonogara'
import Views from './views'

const rendering = (isMobile) => {
  const Lonogara = isMobile ? Mobile : Desktop
  render(
    <Fragment>
      <style>{``}</style>
      <Lonogara {...Props(isMobile)} />
    </Fragment>,
    document.getElementById('app')
  )
}

const Props = (isMobile) => ({
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

rendering(
  navigator
  .userAgent
  .toLowerCase()
  .includes('mobile')
)