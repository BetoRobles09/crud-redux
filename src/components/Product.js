import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteProductAction, getProductEdit } from '../actions/productActions'

const Product = ({ product }) => {
  const { name, price, id } = product

  const dispatch = useDispatch()
  const history = useHistory()

  // Confirm delete
  const confirmDeleteProduct = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductAction(id))
      }
    })
  }

  const redirectEdit = product => {
    dispatch(getProductEdit(product))
    history.push(`/products/edit/${product.id}`)
  }

  return (
    <tr>
      <td>{name}</td>
      <td><span className='font-weight-bold'>${price}</span></td>
      <td className='acciones'>
        <button type='button' className='btn btn-primary mr-2' onClick={() => redirectEdit(product)}>Edit</button>
        <button type='button' className='btn btn-danger' onClick={() => confirmDeleteProduct(id)}>Delete</button>
      </td>
    </tr>
  )
}

export default Product
