import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './ChatBox.css'
import People from './People'
import History from './History'

class ChatBox extends Component {
  constructor (p) {
    super(p)
    this.state = {
      message: ''
    }
  }

  render () {
    const { data } = this.props
    return (
      <div className='ChatBox'>
        <People names={data.names} />
        <History messages={data.messages} />
        <div className='MessageInput'>
          <textarea
            onChange={e => this.setState({ message: e.target.value })}
            cols='30'
            rows='5'
            value={this.state.message}
          />
          <button onClick={this.sendMessage.bind(this)}>
            Send
          </button>
        </div>
      </div>
    )
  }

  sendMessage () {
    if (this.state.message.length > 1) {
      this.props.db.ref('messages').push({
        name: this.props.data.name,
        time: Date.now(),
        text: this.state.message
      })
      this.setState({ message: '' })
    }
  }

  componentDidMount () {
    const { data: xdata, db } = this.props
    db.ref('people').on('value', data => {
      if (data.val()) xdata.names = Object.values(data.val())
    })
    db.ref('messages').on('value', data => {
      if (data.val()) xdata.messages = Object.values(data.val())
    })
  }
}

export default inject('data', 'db')(observer(ChatBox))
