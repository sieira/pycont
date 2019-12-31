import React from 'react'

export interface AuthStateRouteProps {
  isAuthenticated: boolean | null
}

export interface RouteProps {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
}
