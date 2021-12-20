import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'
import '../styles/Payment.scss'
import CheckoutProduct from './CheckoutProduct'
import { getBasketTotal } from './reducer'
import { useStateValue } from './StateProvider'
import axios from 'axios'

const Payment = () => {
  // pull the data layer
  const [{ basket, user }, dispatch] = useStateValue()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [clientSecret, setClientSecret] = useState(true)

  // stripe stuff
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    //  generate stripe secret to allow charging the customer
    // needs a new secret every time the basket changes to reflect the price
    const getClientSecret = async () => {
      const response = await axios
    }
    getClientSecret()
  }, [basket])

  const handleSubmit = async (event) => {
    // submit stripe stuff
    event.preventDefault()
    // make sure only submit once
    setProcessing(true)

    // const payload = await stripe
  }

  const handleChange = (event) => {
    // displays any errors as the customer types
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>17b Fake Street</p>
            <p>London</p>
            <p>United Kingdom</p>
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix="£"
                />
                <button disabled={processing || disabled || succeeded}>
                  {/* disabled for all these states */}
                  <span>{processing ? <p>Processing...</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
