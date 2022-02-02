import React from 'react'
import { useStateValue } from './StateProvider'
import '../styles/Wishlist.scss'

const Wishlist = () => {
  const [{ basket, user }, dispatch] = useStateValue()

  return (
    <div className="wishlist">
      <h2>{user?.email} | Your Wishlist</h2>
      <p>Coming soon...</p>
    </div>
  )
}

export default Wishlist
