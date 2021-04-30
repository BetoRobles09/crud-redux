import React, { useEffect } from 'react'
import Product from './Product'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../actions/productActions'

const Products = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadProducts = () => dispatch(getProductsAction())
    loadProducts()
    // eslint-disable-next-line
  }, [])

  // get state
  const products = useSelector(state => state.products.products)
  const error = useSelector(state => state.products.error)
  const load = useSelector(state => state.products.loading)

  return (
    <>
      <h2 className='text-center my-5'>Product List</h2>
      {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>There was an error</p> : null}
      {load ? <p className='text-center'>Loading...</p> : null}
      <table className='table table-striped'>
        <thead className='bg-primary table-dark'>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? 'There are no producst'
            : (products.map(product => (
              <Product key={product.id} product={product} />
            ))
            )}
        </tbody>
      </table>
    </>
  )
}

export default Products
