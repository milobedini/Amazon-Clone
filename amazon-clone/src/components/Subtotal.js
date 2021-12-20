import React from 'react'
import '../styles/Subtotal.scss'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { useNavigate } from 'react-router-dom'

const Subtotal = () => {
  const navigate = useNavigate()
  const [{ basket }, dispatch] = useStateValue()
  return (
    <div className="subtotal">
      <p>Subtotal ({basket.length} items):</p>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayText={'text'}
        thousandSeparator={true}
        prefix={'£'}
      />
      <small className="subtotal-gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
