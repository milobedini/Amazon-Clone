import React from 'react'
import '../styles/Header.scss'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from '../firebase'
import logo from '../images/logo.png'

const Header = () => {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue()

  const navigate = useNavigate()

  const handleAuth = () => {
    if (user) {
      auth.signOut()
    }
  }

  const goHome = () => {
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="header-left">
        <img className="header-logo" src={logo} alt="logo" onClick={goHome} />
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
          {user ? (
            <>
              <Link to="/orders">
                <div className="header-option">
                  <span className="header-option-one">Returns</span>
                  <span className="header-option-two">{'&'} Orders</span>
                </div>
              </Link>
              <Link to="/profile">
                <div className="header-option">
                  <span className="header-option-one">Your</span>
                  <span className="header-option-two">Account</span>
                </div>
              </Link>
            </>
          ) : null}
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
