import React from 'react'
import '../styles/Subtotal.scss'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { useNavigate } from 'react-router-dom'

const Subtotal = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
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
      {basket.length > 0 ? (
        <button onClick={() => navigate('/payment')}>
          Proceed to Checkout
        </button>
      ) : (
        <button onClick={() => navigate('/')}>Basket is Empty</button>
      )}
    </div>
  )
}

export default Subtotal
