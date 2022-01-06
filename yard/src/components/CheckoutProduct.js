import React from 'react'
import '../styles/CheckoutProduct.scss'
import { useStateValue } from './StateProvider'
import { Image } from 'cloudinary-react'

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue()

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    })
  }

  return (
    <div className="checkout-product">
      {/* <img
        className="checkoutProduct-image"
        src={image}
        alt="checkout product"
      /> */}

      <Image
        cloudName="dvgbdioec"
        publicId={`https://res.cloudinary.com/dvgbdioec/image/upload/${image}`}
        alt="checkout product"
        className="checkoutProduct-image"
      />

      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price">
          <strong>£{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
