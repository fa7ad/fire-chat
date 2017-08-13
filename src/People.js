import React from 'react'
import { observer } from 'mobx-react'

import './People.css'
import head from './head.svg'

const People = props => (
  <div className='People'>
    {props.names.map((el, idx) => (
      <div className='Person' key={idx}>
        <img
          src={head}
          alt={el.name}
          className='avatar'
          style={{
            filter: `sepia() hue-rotate(${el.hue}deg) saturate(10)`
          }}
        />
        <b>{el.name}</b>
      </div>
    ))}
  </div>
)

export default observer(People)
