import React from 'react'
import '../styles/Header.scss'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from '../firebase'
import logo from '../images/logo.png'

const Header = () => {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue()

  const handleAuth = () => {
    if (user) {
      auth.signOut()
    }
  }

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img className="header-logo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="header-right">
        <div className="header-nav">
          <Link to={!user && '/login'}>
            <div onClick={handleAuth} className="header-option">
              <span className="header-option-one user-details">
                Hello {!user ? 'Guest' : user.email}
              </span>
              <span className="header-option-two">
                {user ? 'Sign Out' : 'Sign In'}
              </span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="header-option">
              <span className="header-option-one">Returns</span>
              <span className="header-option-two">{'&'} Orders</span>
            </div>
          </Link>
          <div className="header-option">
            <span className="header-option-one">Your</span>
            <span className="header-option-two">Account</span>
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
    </div>
  )
}

export default Header
