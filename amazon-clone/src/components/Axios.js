import axios from 'axios'

const instance = axios.create({
  // API cloud function url
  baseURL: 'tbc',
})

export default instance
