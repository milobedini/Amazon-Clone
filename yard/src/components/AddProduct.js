import { addDoc, collection } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/AddProduct.scss'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import axios from 'axios'
import Select from 'react-select'
import { categoryList, stars } from './Select'

const AddProduct = () => {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue()
  const [processing, setProcessing] = useState(false)

  const navigate = useNavigate()
  const itemsRef = collection(db, 'products')
  const [data, setData] = useState({
    title: '',
    price: parseFloat('').toFixed(2),
    image: '',
    ownerid: user?.uid,
  })
  const [publicId, setPublicId] = useState('')
  const [categories, setCategories] = useState([])
  const [rating, setRating] = useState({})

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
    setProcessing(true)
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
        rating: rating.value,
        image: publicId,
        category: categories.map((x) => x.value),
        ownerid: user?.uid,
      })
      navigate('/')
    }
    addItem()
    // eslint-disable-next-line
  }, [publicId])

  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'green',
      },
    }
  }

  console.log(categories, rating)

  return (
    <div className="product-form">
      <h1>Add Your Product</h1>
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
              console.log(data)
            }}
          />
        </div>
      </form>
      <Select
        options={categoryList}
        theme={customTheme}
        onChange={setCategories}
        className="select"
        placeholder="Select Category"
        noOptionsMessage={() => 'No other categories!'}
        isSearchable
        isMulti
      />
      <Select
        options={stars}
        theme={customTheme}
        onChange={setRating}
        className="select"
        placeholder="Star Rating"
        isSearchable={false}
      />
      <button className="add-product" onClick={handleSubmit}>
        {!processing ? (
          <input type={'submit'} value="Add Product" />
        ) : (
          <span>Adding Product....</span>
        )}
      </button>
    </div>
  )
}

export default AddProduct
