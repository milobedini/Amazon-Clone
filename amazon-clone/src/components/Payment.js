import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import '../styles/Payment.scss'
import CheckoutProduct from './CheckoutProduct'
import { getBasketTotal } from './reducer'
import { useStateValue } from './StateProvider'
import axios from './Axios'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
// import { NavigationActions } from 'react-navigation'

const Payment = () => {
  const navigate = useNavigate()

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
      const response = await axios({
        method: 'post',
        // Needs the currency in subunits (pence)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, [basket])

  console.log('The secret is ->', clientSecret)
  console.log(db)

  const handleSubmit = async (event) => {
    // submit stripe stuff
    event.preventDefault()
    // make sure only submit once
    setProcessing(true)

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        try {
          // adds user to users collection and adds order into the users' orders collection
          const docRef = addDoc(collection(db, 'users', user?.uid, 'orders'), {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })
        } catch (err) {
          console.log('Could not add doc, error =>', err)
        }

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        dispatch({
          type: 'EMPTY_BASKET',
        })

        navigate('/orders')
      })
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
              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => <h4>Order Total: {value}</h4>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix="£"
                />
                <CardElement onChange={handleChange} />

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
