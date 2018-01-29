import React, { Component } from 'react'

export class Domestic extends Component {
  render() { return this.props.children }
  shouldComponentUpdate() { return false }
}

export class ExhibitLure extends Component {
  constructor(props) {
    super(props)
    this.props.store.attach(this, { inherit: true })
  }
  componentWillUnmount() {
    this.props.store.detach()
  }
  render() {
    const { Children, customProps, actions } = this.props
    const { posts, done } = this.state
    return <Children {...{ customProps, actions, posts, done }} />
  }
}