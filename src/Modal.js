import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import _ from 'lodash'

import './Modal.css'

class Modal extends Component {
  constructor (pr) {
    super(pr)
    this.state = {
      name: ''
    }
    this.sendName = _.bind(this.sendName, this)
  }

  render () {
    return (
      <div className='Modal'>
        <form
          className='NameBox'
          onSubmit={e => {
            e.preventDefault()
            this.sendName()
          }}
        >
          <h3>Your Name:</h3>
          <input
            type='text'
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button onClick={this.sendName}>Done</button>
        </form>
      </div>
    )
  }

  sendName () {
    const { data, ui, db } = this.props
    if (this.state.name.length > 1 && data.id === '') {
      ui.showName = false
      data.name = this.state.name
      data.id = db.ref('people').push(this.state.name)
    }
  }
}

export default inject('db', 'ui', 'data')(observer(Modal))
