import * as React from 'react'
import { connect } from 'react-redux'

import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../../store/auth/actions'
import { AuthState } from '../../store/auth/types'

interface Props {
  isAuthenticated: boolean | null
}

interface Props {
  logoutConnect: () => void
}

const MainNav: React.FunctionComponent<Props> = ({
  isAuthenticated,
  logoutConnect
}: Props) => {
  const brandLinkHref = isAuthenticated ? '/home' : '/'

  const logInOut = isAuthenticated ? (
    <Nav.Link onClick={logoutConnect}>Log out</Nav.Link>
  ) : (
    <LinkContainer to="/login">
      <Nav.Link>Log in</Nav.Link>
    </LinkContainer>
  )

  const mainLinks = isAuthenticated ? (
    <LinkContainer to="/home">
      <Nav.Link>Home</Nav.Link>
    </LinkContainer>
  ) : (
    <LinkContainer to="/">
      <Nav.Link>Landing</Nav.Link>
    </LinkContainer>
  )

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href={brandLinkHref}>🍺 Pycont</Navbar.Brand>
      <Nav>
        {mainLinks}
        <LinkContainer to="/terms">
          <Nav.Link>Terms</Nav.Link>
        </LinkContainer>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Nav>{logInOut}</Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state: AuthState): Props => ({
  isAuthenticated: state.isAuthenticated
})

const mapDispatchToProps = { logoutConnect: logout }

export default connect(mapStateToProps, mapDispatchToProps)(MainNav)
