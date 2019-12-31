import { connect } from 'react-redux'

import { PycontState } from '../store/types'
import { authStateRouteFactory } from './factories'
import { AuthStateRouteProps } from './types'

const LoggedOutRoute = authStateRouteFactory(false, '/home')

const mapStateToProps = (state: PycontState): AuthStateRouteProps => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(LoggedOutRoute)
