import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import '../styles/Product.scss'
import { useStateValue } from './StateProvider'

const Product = ({ id, title, image, price, rating, category, ownerid }) => {
  const [{ user }, dispatch] = useStateValue()

  // console.log('current basket', basket)

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
        category,
        ownerid,
      },
    })
  }
  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id)
    await deleteDoc(productDoc)
    window.location.reload()
  }

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <strong>£{price}</strong>
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
      {user?.uid === ownerid ? (
        <div className="edit-delete">
          <Link to={`/${id}/edit`}>
            <button>Edit Listing</button>
          </Link>
          <button
            onClick={() => {
              deleteProduct(id)
            }}
          >
            Delete Product
          </button>
        </div>
      ) : null}
      <p className="product-category">{category}</p>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
