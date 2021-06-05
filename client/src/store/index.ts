import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReactGA from 'react-ga'

import createRootReducer from '../reducers/index'

export const history = createHashHistory()

ReactGA.initialize('UA-67193398-5')

history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname })
  ReactGA.pageview(pathname)
});

const mandatoryMiddlewares = [thunkMiddleware]
const logger: any = createLogger({ diff: true, collapsed: true })
const composed =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...mandatoryMiddlewares))
    : composeWithDevTools(applyMiddleware(...mandatoryMiddlewares, logger))

export const store = createStore(createRootReducer(history), composed)
