import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import '../styles/EditProduct.scss'
import axios from 'axios'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    title: '',
    price: 0,
    image: '',
    category: '',
  })
  const [publicId, setPublicId] = useState('')

  const [preloadedValues, setPreloadedValues] = useState({
    title: '',
    price: '',
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', data.image)
    formData.append('upload_preset', 'ilrqnidr')
    axios
      .post('https://api.cloudinary.com/v1_1/dvgbdioec/image/upload', formData)
      .then((response) => {
        console.log(response.data)
        console.log(response.data.public_id)
        setPublicId(response.data.public_id)
      })
  }

  useEffect(() => {
    if (!publicId) {
      return
    }
    const updateProduct = async () => {
      const productDoc = doc(db, 'products', id)
      const newFields = {
        title: data.title,
        price: data.price,
        image: publicId,
        category: data.category,
      }
      await updateDoc(productDoc, newFields)
      navigate('/')
    }
    updateProduct()
    // eslint-disable-next-line
  }, [publicId])

  return (
    <div className="product-form">
      <h1>Edit Your Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
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
            type="text"
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
            type="file"
            id="image"
            name="image"
            placeholder="Image"
            onChange={(event) => {
              setData({
                ...data,
                image: event.target.files[0],
              })
            }}
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
