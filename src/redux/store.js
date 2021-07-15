import { createStore, compose } from 'redux'
import { cartReducer } from './cart/cartReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(cartReducer, composeEnhancers())