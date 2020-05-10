import React from 'react'
import { connect } from 'react-redux'
import { Route, Router } from 'react-router-dom'

import { checkAuth } from './store/auth/actions'
import { PycontState } from './store/types'

import history from './history'
import Pages from './routes/Pages'
import MainNav from './components/nav'

interface StateProps {
  isAuthenticated: boolean | null
}

interface DispatchProps {
  checkAuthConnect: () => void
}

const App: React.FunctionComponent<StateProps & DispatchProps> = ({
  checkAuthConnect,
  isAuthenticated,
}: StateProps & DispatchProps) => {
  React.useEffect(() => {
    checkAuthConnect()
  }, [])

  const app =
    isAuthenticated !== null ? (
      <Router history={history}>
        <MainNav />
        <main>
          <Route component={Pages} />
        </main>
      </Router>
    ) : null

  return <div className="App">{app}</div>
}

const mapStateToProps = (state: PycontState): StateProps => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
  checkAuthConnect: checkAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
