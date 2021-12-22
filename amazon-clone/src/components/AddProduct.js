import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import '../styles/AddProduct.scss'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const AddProduct = () => {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue()
  const navigate = useNavigate()
  const itemsRef = collection(db, 'products')
  const [data, setData] = useState({
    title: '',
    price: 0,
    rating: 0,
    image: '',
    category: '',
    ownerid: user?.uid,
  })

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const addItem = async (event) => {
    event.preventDefault()
    await addDoc(itemsRef, {
      title: data.title,
      price: data.price,
      rating: data.rating,
      image: data.image,
      category: data.category,
      ownerid: user?.uid,
    })
    navigate('/')
  }
  return (
    <div className="add-product">
      <form onSubmit={addItem} className="add-product-form">
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="price"></label>
          <input
            type={'number'}
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="rating"></label>
          <input
            type={'number'}
            id="rating"
            name="rating"
            placeholder="Rating"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="image"></label>
          <input
            type={'text'}
            id="image"
            name="image"
            placeholder="Image"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="category"></label>
          <input
            type={'text'}
            id="category"
            name="category"
            placeholder="Category"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button>
            <input type={'submit'} value="Add Product" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
