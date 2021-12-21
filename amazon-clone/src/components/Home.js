import React, { useState, useEffect } from 'react'
import '../styles/Home.scss'
import Product from './Product'
import { db } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

const Home = () => {
  const [items, setItems] = useState([])
  const itemsRef = collection(db, 'products')
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState(0)
  const [newRating, setNewRating] = useState(0)
  const [newImage, setNewImage] = useState('')

  const addItem = async () => {
    await addDoc(itemsRef, {
      title: newTitle,
      price: newPrice,
      rating: newRating,
      image: newImage,
    })
  }

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsRef)
      console.log(data.docs)
      setItems(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    }
    getItems()
  }, [])

  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <input
          type={'text'}
          placeholder="Title"
          onChange={(event) => {
            setNewTitle(event.target.value)
          }}
        />
        <input
          type={'number'}
          placeholder="Price"
          onChange={(event) => {
            setNewPrice(event.target.value)
          }}
        />
        <input
          type={'number'}
          placeholder="Rating"
          onChange={(event) => {
            setNewRating(event.target.value)
          }}
        />
        <input
          type={'text'}
          placeholder="Image"
          onChange={(event) => {
            setNewImage(event.target.value)
          }}
        />
        <button onClick={addItem}>Add Product</button>
        <div className="home-row">
          <Product
            id="12321341"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={11.96}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
          />
          {items.map((item) => {
            return (
              <Product
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            )
          })}
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          />
        </div>

        <div className="home-row">
          <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>

        <div className="home-row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
