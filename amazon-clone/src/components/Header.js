import React from 'react'
import '../styles/Header.scss'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from '../firebase'

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue()

  const handleAuth = () => {
    if (user) {
      auth.signOut()
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>
      <div className="header-search">
        <input className="header-search-input" type="text" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuth} className="header-option">
            <span className="header-option-one">
              Hello {!user ? 'Guest' : user.email}
            </span>
            <span className="header-option-two">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <div className="header-option">
          <span className="header-option-one">Returns</span>
          <span className="header-option-two">{'&'} Orders</span>
        </div>
        <div className="header-option">
          <span className="header-option-one">Your</span>
          <span className="header-option-two">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header-option-basket">
            <ShoppingBasketIcon />
            <span className="header-option-two header-basket-count">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
