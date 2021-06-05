import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import tweets from './tweets'
import summary from './summary'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    tweets,
    summary,
  })
