import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCC,
  ADD_PRODUCT_ERR,
  START_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCC,
  DOWNLOAD_PRODUCTS_ERR,
  GET_DELETED_PRODUCT,
  DELETED_PRODUCT_SUCC,
  DELETED_PRODUCT_ERR,
  GET_EDIT_PRODUCT,
  EDIT_PRODUCT_SUCC,
  EDIT_PRODUCT_ERR
} from '../types'

// Each reducer has their own state
const initialState = {
  products: [],
  error: null,
  loading: false,
  deleteproduct: null,
  editproduct: null
}

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
    case START_DOWNLOAD_PRODUCTS:
      return {
        ...state,
        loading: action.payload
      }
    case ADD_PRODUCT_SUCC:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      }
    case DOWNLOAD_PRODUCTS_ERR:
    case ADD_PRODUCT_ERR:
    case DELETED_PRODUCT_ERR:
    case EDIT_PRODUCT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DOWNLOAD_PRODUCTS_SUCC:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload
      }
    case GET_DELETED_PRODUCT:
      return {
        ...state,
        deleteproduct: action.payload
      }
    case DELETED_PRODUCT_SUCC:
      return {
        ...state,
        products: state.products.filter(product => product.id !== state.deleteproduct),
        deleteproduct: null
      }
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        editproduct: action.payload
      }
    case EDIT_PRODUCT_SUCC:
      return {
        ...state,
        productedit: null,
        products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
      }
    default:
      return state
  }
}
