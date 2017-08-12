import R from 'ramda'
import _rand from 'lodash.random'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './ChatBox.css'
import People from './People'
import History from './History'

class ChatBox extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
  }

  render () {
    const { data } = this.props
    return (
      <div className='ChatBox'>
        <People names={data.names} />
        <History messages={data.messages} />
        <form className='MessageInput' onSubmit={this.sendMessage.bind(this)}>
          <input
            onChange={e => this.setState({ message: e.target.value })}
            type='text'
            value={this.state.message}
          />
        </form>
      </div>
    )
  }

  sendMessage (e) {
    e.preventDefault()

    const { data, db } = this.props
    if (this.state.message.length > 1) {
      db.ref('messages').push({
        name: data.name,
        time: Date.now(),
        text: this.state.message
      })

      this.setState({ message: '' })
    }
  }

  componentDidMount () {
    const { data: xdata, db } = this.props

    db.ref('people').on('value', ref => {
      if (!ref.val()) return void 0

      const names = R.values(ref.val()).map(name => ({
        name,
        hue: _rand(0.1, 90.0)
      }))
      Object.assign(xdata, {names})
    })

    db.ref('messages').limitToLast(250).on('value', ref => {
      if (!ref.val()) return void 0

      const messages = R.reverse(R.values(ref.val()))
      Object.assign(xdata, {messages})
    })
  }
}

export default inject('data', 'db')(observer(ChatBox))
