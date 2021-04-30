import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Actions redux
import { createNewProductAction } from '../actions/productActions'
import { showAlert, hideAlertAction } from '../actions/alertAction'

const NewProduct = ({ history }) => {
  // Local State
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  // UseDispatch
  const dispatch = useDispatch()

  // Get state
  const load = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)
  const alert = useSelector(state => state.alert.alert)

  // Call to action
  const addProduct = product => dispatch(createNewProductAction(product))

  // Submit
  const submitNewProduct = e => {
    e.preventDefault()

    // Validation
    if (name.trim() === '' || price <= 0) {
      const alert = {
        msg: 'Both fields are mandatory',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(showAlert(alert))
      return
    }
    // Error handle
    dispatch(hideAlertAction())

    // Create new product
    addProduct({
      name,
      price
    })
    history.push('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>Add new Product</h2>
            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
            <form onSubmit={submitNewProduct}>
              <div className='form-group'>
                <label>Product name</label>
                <input type='text' className='form-control' placeholder='Product' name='name' value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className='form-group'>
                <label>Product price</label>
                <input type='number' className='form-control' placeholder='Price' name='price' value={price} onChange={e => setPrice(Number(e.target.value))} />
              </div>
              <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Add</button>
            </form>
            {load ? <p>Loading...</p> : null}
            {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
