import '../styles/Checkout.scss'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Checkout = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue()

  const browse = () => {
    navigate('/')
  }

  const emptyBasket = () => {
    toast.info(`${basket.length} items removed`, {
      position: 'bottom-right',
    })
    dispatch({
      type: 'EMPTY_BASKET',
    })
  }

  return (
    <div className="checkout">
      <div className="checkout-left">
        <div>
          <div className="checkout-top">
            <h3>Hello, {user?.email}</h3>
            <div className="checkout-right">
              <Subtotal />
            </div>
          </div>
          <h2 className="checkout-title">Your Shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <div className="no-items">
              <p>
                Looks like your basket is empty! Let's solve that.
                <button onClick={browse}>Browse</button>
              </p>
            </div>
          )}
        </div>
        {basket.length > 0 ? (
          <div className="empty-basket">
            <button onClick={emptyBasket}>Empty Basket</button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Checkout
