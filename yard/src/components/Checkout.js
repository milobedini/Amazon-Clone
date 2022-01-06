import '../styles/Checkout.scss'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

const Checkout = () => {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout-left">
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>

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

      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
