/* eslint-disable */
const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
// just change below key if it were a real store.
const stripe = require('stripe')(
  'sk_test_51K8nLHICFeSjij0MdRItA7kBeUtCAfKRoZN0wwJQg2VQarOYfAjTJ5JCAVu5PpAgCFPQVnxyB9O0bV1aJMpOUiXU00d8J3g8Jj'
)

// API

// App config
const app = express()
// Middleware
app.use(cors({ origin: true }))
app.use(express.json())
// API Routes
app.get('/', (request, response) => response.status(200).send('Hello world')) //dummy route
// matches payment route in front end.
app.post('/payments/create', async (request, response) => {
  // reference total param in query (pence)
  // could use req.params({total})
  const total = request.query.total
  console.log('Payment Request Incoming in pence', total)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'gbp',
    })

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.log(err)
    return response.status(401)
  }
})
// Listener

exports.api = functions.https.onRequest(app)

// Dummy route endpoint
// http://localhost:5001/yard-60efd/us-central1/api
