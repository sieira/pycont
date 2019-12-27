import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'

import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)

serviceWorker.unregister()
