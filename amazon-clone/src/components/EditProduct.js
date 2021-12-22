import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import '../styles/EditProduct.scss'

const EditProduct = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [data, setData] = useState({
    title: '',
    price: 0,
    image: '',
    category: '',
  })

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const updateProduct = async (event) => {
    event.preventDefault()
    const productDoc = doc(db, 'products', id)
    const newFields = {
      title: data.title,
      price: data.price,
      image: data.image,
      category: data.category,
    }
    await updateDoc(productDoc, newFields)
    navigate('/')
  }

  return (
    <div className="edit-product">
      <form className="add-product-form" onSubmit={updateProduct}>
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
            <input type={'submit'} value="Edit Product" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
