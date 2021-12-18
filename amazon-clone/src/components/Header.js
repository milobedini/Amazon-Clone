import React from 'react'
import '../styles/Header.scss'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

const Header = () => {
  return (
    <div className="header">
      <img
        className="header-logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="logo"
      />
      <div className="header-search">
        <input className="header-search-input" type="text" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-nav">
        <div className="header-option">
          <span className="header-option-one">Hello Guest</span>
          <span className="header-option-two">Sign In</span>
        </div>
        <div className="header-option">
          <span className="header-option-one">Returns</span>
          <span className="header-option-two">{'&'} Orders</span>
        </div>
        <div className="header-option">
          <span className="header-option-one">Your</span>
          <span className="header-option-two">Prime</span>
        </div>
        <div className="header-option-basket">
          <ShoppingBasketIcon />
          <span className="header-option-two header-basket-count">0</span>
        </div>
      </div>
    </div>
  )
}

export default Header
