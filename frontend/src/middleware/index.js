import thunk from 'redux-thunk'
import logger from './logger'
import error from './error'
import cache from './cache'
import { applyMiddleware } from 'redux'
/**
 * Initialize store and dispatch, which will be used later.
 */
export default applyMiddleware(
    thunk,
    logger,
    error,
    cache 
)