import { SHOW_ALERT, HIDE_ALERT } from '../types/index'

const initialState = {
  alert: null
}
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload
      }
    case HIDE_ALERT:
      return {
        ...state,
        alert: null
      }
    default:
      return state
  }
}
