import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from './reducer'

export default (initialState, history) => {
  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
    ),
  )(createStore)

  const store = createStoreWithMiddleware(createRootReducer(history))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
