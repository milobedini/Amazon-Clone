import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/Orders.scss'
import Order from './Order'
import { useStateValue } from './StateProvider'

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        // create realtime snapshot of the users orders
        const querySnapshot = await getDocs(
          collection(db, 'users', user?.uid, 'orders')
        )

        console.log(querySnapshot)
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      } else {
        setOrders([])
      }
    }
    fetchOrders()
  }, [user])
  console.log(orders)
  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
