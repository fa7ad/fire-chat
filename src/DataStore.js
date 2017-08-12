import { observable } from 'mobx'

const DataStore = {
  id: '',
  name: '',
  names: [],
  messages: []
}

export default observable(DataStore)
