import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { editProductAction } from '../actions/productActions'

const EditProduct = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // State
  const [product, setProduct] = useState({
    name: '',
    price: ''
  })

  // Edit product
  const productedit = useSelector(state => state.products.editproduct)

  useEffect(() => {
    setProduct(productedit)
  }, [productedit])

  // Read form data
  const onChangeForm = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const { name, price } = product

  const submitEditProduct = e => {
    e.preventDefault()
    dispatch(editProductAction(product))
    history.push('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>Update Product</h2>
            <form onSubmit={submitEditProduct}>
              <div className='form-group'>
                <label>Product name</label>
                <input type='text' className='form-control' placeholder='Product' name='name' value={name} onChange={onChangeForm} />
              </div>
              <div className='form-group'>
                <label>Product price</label>
                <input type='number' className='form-control' placeholder='Price' name='price' value={price} onChange={onChangeForm} />
              </div>
              <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
