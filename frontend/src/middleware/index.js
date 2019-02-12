import thunk from 'redux-thunk'
import logger from './logger'
import api from './api'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
    thunk,
    logger,
    api
)