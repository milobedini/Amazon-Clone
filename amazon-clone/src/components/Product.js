import React from 'react'
import '../styles/Product.scss'
import { useStateValue } from './StateProvider'

const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue()

  const addToBasket = () => {
    // dispatch item into the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    })
  }

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
