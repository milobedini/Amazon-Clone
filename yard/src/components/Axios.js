import axios from 'axios'

const instance = axios.create({
  // testing route: 'http://localhost:5001/yard-60efd/us-central1/api'

  // API cloud function url. Get this from firebase functions tab once functions deployed.
  baseURL: 'https://us-central1-yard-60efd.cloudfunctions.net/api',
})

export default instance
