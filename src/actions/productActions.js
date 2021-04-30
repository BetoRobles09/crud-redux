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
  EDIT_PRODUCT_ERR,
  EDIT_BEGIN
} from '../types'

import clientAxios from '../config/axios'
import Swal from 'sweetalert2'

// Create new products
export function createNewProductAction (product) {
  return async (dispatch) => {
    dispatch(addProduct())
    try {
      // Insert in API
      await clientAxios.post('/products', product)
      dispatch(addProductSucc(product))
      // Alert
      Swal.fire(
        'Correct',
        'The product was added succesfully',
        'success'
      )
    } catch (error) {
      console.log(error)
      dispatch(addProductErr(true))
      // alert error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error, try again'
      })
    }
  }
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
})

const addProductSucc = product => ({
  type: ADD_PRODUCT_SUCC,
  payload: product
})

const addProductErr = status => ({
  type: ADD_PRODUCT_ERR,
  payload: status
})

// Func to download products from db
export function getProductsAction () {
  return async (dispatch) => {
    dispatch(downloadProducts())
    try {
      const respone = await clientAxios.get('/products')
      dispatch(downloadProductsSucc(respone.data))
    } catch (error) {
      dispatch(downloadProductsErr())
    }
  }
}

const downloadProducts = () => ({
  type: START_DOWNLOAD_PRODUCTS,
  payload: true
})

const downloadProductsSucc = products => ({
  type: DOWNLOAD_PRODUCTS_SUCC,
  payload: products
})

const downloadProductsErr = () => ({
  type: DOWNLOAD_PRODUCTS_ERR,
  payload: true
})

// DELETE
export function deleteProductAction (id) {
  return async (dispatch) => {
    dispatch(getProductDelete(id))
    try {
      await clientAxios.delete(`/products/${id}`)
      dispatch(deleteSucc())
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } catch (error) {
      console.log(error)
      dispatch(deleteErr())
    }
  }
}

const getProductDelete = id => ({
  type: GET_DELETED_PRODUCT,
  payload: id
})

const deleteSucc = () => ({
  type: DELETED_PRODUCT_SUCC
})

const deleteErr = () => ({
  type: DELETED_PRODUCT_ERR,
  payload: true
})

// EDIT
export function getProductEdit (product) {
  return (dispatch) => {
    dispatch(getProductAction(product))
  }
}

const getProductAction = product => ({
  type: GET_EDIT_PRODUCT,
  payload: product
})

export function editProductAction (product) {
  return async (dispatch) => {
    dispatch(editProduct())
    try {
      await clientAxios.put(`/products/${product.id}`, product)
      dispatch(editProductSucc(product))
    } catch (error) {
      console.log(error)
      dispatch(editProductErr())
    }
  }
}

const editProduct = () => ({
  type: EDIT_BEGIN
})

const editProductSucc = product => ({
  type: EDIT_PRODUCT_SUCC,
  payload: product
})

const editProductErr = () => ({
  type: EDIT_PRODUCT_ERR,
  payload: true
})
