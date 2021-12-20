import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Payment.scss'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'

const Payment = () => {
  // pull the data layer
  const [{ basket, user }, dispatch] = useStateValue()

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
          <div className="payment-details">Stripe stuff</div>
        </div>
      </div>
    </div>
  )
}

export default Payment
