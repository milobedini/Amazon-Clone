import React, { useState, useEffect } from 'react'
import '../styles/Home.scss'
import Product from './Product'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const Home = () => {
  const [{ user }, dispatch] = useStateValue()

  const [items, setItems] = useState([])
  const itemsRef = collection(db, 'products')

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
    // eslint-disable-next-line
  }, [])

  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        {user ? (
          <Link to="/add">
            <div className="list-product-link">
              <h3>List A Product</h3>
            </div>
          </Link>
        ) : null}

        {items.map((item) => {
          return (
            <Product
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
              category={item.category}
              ownerid={item.ownerid}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
