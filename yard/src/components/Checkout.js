import '../styles/Checkout.scss'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue()

  const browse = () => {
    navigate('/')
  }

  return (
    <div className="checkout">
      <div className="checkout-left">
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item) => (
              <CheckoutProduct
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
      </div>

      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
