import { toast } from 'react-toastify'

export const initialState = {
  basket: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  user: null,
}

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    // add action type to the switch case
    // spread state so previous state is not lost
    // then add items to basket array in reducer
    case 'ADD_TO_BASKET':
      toast.success(`${action.item.title} added to cart`, {
        position: 'bottom-right',
      })
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...state.basket, action.item])
      )
      return {
        ...state,
        basket: [...state.basket, action.item],
      }

    case 'EMPTY_BASKET':
      localStorage.setItem('cartItems', [])
      return {
        ...state,
        basket: [],
      }
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      let newBasket = [...state.basket]
      // if item in basket
      if (index >= 0) {
        toast.info(`item removed from basket`, {
          position: 'bottom-right',
        })
        // removes the item from the new basket
        newBasket.splice(index, 1)
      } else {
        console.warn(`Product ${action.id} is not in basket.`)
      }
      localStorage.setItem('cartItems', JSON.stringify(newBasket))
      return {
        // keeps previous state with new basket
        ...state,
        basket: newBasket,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}



export default reducer
