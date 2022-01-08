import React, { useEffect, useState } from 'react'
import '../styles/Profile.scss'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useStateValue } from './StateProvider'
import Product from './Product'
import { Link } from 'react-router-dom'

const Profile = () => {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue()
  const [ownedProducts, setOwnedProducts] = useState([])
  const q = query(
    collection(db, 'products'),
    where('ownerid', '==', `${user?.uid}`)
  )

  useEffect(() => {
    const getProfileOrders = async () => {
      const querySnapshot = await getDocs(q)
      const usefulArray = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
        usefulArray.push(doc.data())
      })
      setOwnedProducts(usefulArray)
    }
    getProfileOrders()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>{user?.email}</h1>
        <div className="list-product">
          <Link to="/add">
            <div className="list-product-link">
              <h3>List A Product</h3>
            </div>
          </Link>
        </div>
      </div>
      <h2>Your Listed Products</h2>
      <div className="item-list">
        {ownedProducts.map((item) => {
          return (
            <Product
              key={item.title}
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

export default Profile
