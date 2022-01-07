import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import '../styles/Product.scss'
import { useStateValue } from './StateProvider'
import { Image } from 'cloudinary-react'

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
        <div className="price-cat">
          <p className="product-price">
            <strong>£{price}</strong>
          </p>
          <p className="product-category">
            {category.length > 1
              ? category.map((x) => <small className="mulit-cat">{x}, </small>)
              : category[0]}
          </p>
        </div>
        <div className="product-rating">
          <div className="stars">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐️</p>
              ))}
          </div>
        </div>
      </div>
      <Image
        cloudName="dvgbdioec"
        publicId={`https://res.cloudinary.com/dvgbdioec/image/upload/${image}`}
      />
      {user?.uid === ownerid ? (
        <div className="edit-delete">
          <Link to={`/${id}/edit`}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#f45b69"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </Link>
          <button
            onClick={() => {
              deleteProduct(id)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#f45b69"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : null}

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
