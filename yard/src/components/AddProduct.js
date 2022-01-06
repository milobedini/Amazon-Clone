import { addDoc, collection } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/AddProduct.scss'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import axios from 'axios'

const AddProduct = () => {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue()
  const navigate = useNavigate()
  const itemsRef = collection(db, 'products')
  const [data, setData] = useState({
    title: '',
    price: parseFloat('').toFixed(2),
    rating: parseInt(''),
    image: '',
    category: '',
    ownerid: user?.uid,
  })
  const [publicId, setPublicId] = useState('')

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
    const addItem = async () => {
      console.log(publicId)
      await addDoc(itemsRef, {
        title: data.title,
        price: parseFloat(data.price),
        rating: parseInt(data.rating),
        image: publicId,
        category: data.category,
        ownerid: user?.uid,
      })
      navigate('/')
    }
    addItem()
  }, [publicId])

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit} className="add-product-form">
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
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="rating"></label>
          <input
            type="text"
            id="rating"
            name="rating"
            placeholder="Rating"
            onChange={handleFormChange}
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
                ['image']: event.target.files[0],
              })
              console.log(data)
            }}
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
