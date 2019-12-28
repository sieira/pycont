import * as React from 'react'
import { connect } from 'react-redux'

import { AuthState } from '../store/auth/types'
import { authStateRouteFactory } from './factories'

const LoggedOutRoute = authStateRouteFactory(
  false,
  '/home',
  <header>Logged Out Header</header>,
  <footer>Logger Out Footer</footer>
)

const mapStateToProps = (state: AuthState): AuthState => ({
  isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps)(LoggedOutRoute)
