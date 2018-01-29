import React from 'react'
import { internalHtml } from 'lonogara-tool/toreact'

export default src =>
  fetch(src)
  .then(res => res.text())
  .then(html => internalHtml(html, {
    imgas: { reference: src },
    components
  }))

const components = {}