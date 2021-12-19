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
    default:
      return state
  }
}

export default reducer
