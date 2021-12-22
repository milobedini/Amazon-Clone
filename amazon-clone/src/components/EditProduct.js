import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
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

  const [preloadedValues, setPreloadedValues] = useState({
    title: '',
    price: 0,
    image: '',
    category: '',
  })

  const itemRef = doc(db, 'products', id)

  useEffect(() => {
    const getItem = async () => {
      const data = await getDoc(itemRef)
      const product = data.data()
      console.log(product)
      setPreloadedValues({
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      })
      setData({
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
    getItem()
    // eslint-disable-next-line
  }, [])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
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
            defaultValue={preloadedValues.title}
          />
        </div>
        <div>
          <label htmlFor="price"></label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleFormChange}
            defaultValue={preloadedValues.price}
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
            defaultValue={preloadedValues.image}
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
            defaultValue={preloadedValues.category}
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
