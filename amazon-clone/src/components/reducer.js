export const initialState = {
  basket: [],
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
      return {
        ...state,
        basket: [...state.basket, action.item],
      }
    case 'EMPTY_BASKET':
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
        // removes the item from the new basket
        newBasket.splice(index, 1)
      } else {
        console.warn(`Product ${action.id} is not in basket.`)
      }
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
