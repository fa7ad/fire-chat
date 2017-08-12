import React from 'react'

import _ from 'lodash'
import head from './head.svg'

const People = props => (
  <div className='People'>
    {props.names.map((el, idx) => {
      const css = {
        filter: `sepia() hue-rotate(${_.random(0, 360)}deg) saturate(10)`
      }
      return (
        <div className='Person' key={idx}>
          <img src={head} alt={el} className='avatar' style={css} />
          <b>{el}</b>
        </div>
      )
    })}
  </div>
)

export default People
