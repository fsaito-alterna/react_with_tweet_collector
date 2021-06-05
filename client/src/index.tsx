import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/index'
import { routePath } from './appConfig'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={routePath.root} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
