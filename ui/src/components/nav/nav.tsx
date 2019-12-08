import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AuthState } from '../../store/auth/types'

interface Props {
  isAuthenticated: boolean | null
  csrfToken: string | null
}

const Nav: React.FunctionComponent<Props> = ({
  isAuthenticated,
  csrfToken
}: Props) => {
  const logInOut = isAuthenticated ? (
    <li>
      <NavLink to="/logout">Log out</NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/login">Log in</NavLink>
    </li>
  )

  const mainLinks = isAuthenticated ? (
    <li>
      <NavLink to="/home">Home</NavLink>
    </li>
  ) : (
    <>
      <li>
        <NavLink to="/">Landing</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  )

  return (
    <>
      <p>
        Auth state:{' '}
        {isAuthenticated ? `Logged in user: ${csrfToken}` : 'Logged out'}
      </p>
      <ul>
        {mainLinks}
        <li>
          <NavLink to="/terms">Terms</NavLink>
        </li>
        {logInOut}
      </ul>
    </>
  )
}

const mapStateToProps = (state: AuthState): Props => ({
  csrfToken: state.csrfToken,
  isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps)(Nav)
