import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import firebase from 'firebase'

import './index.css'
import fireConf from './config'
import App from './App'

import UIStore from './UIStore'
import DataStore from './DataStore'

firebase.initializeApp(fireConf)

ReactDOM.render(
  <Provider db={firebase.database()} ui={UIStore} data={DataStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

window.addEventListener('beforeunload', e => {
  DataStore.id.remove()
  return false
})
