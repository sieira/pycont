import { rootReducer } from '.'
import { UNAUTHENTICATE } from './auth/constants'

it('Should empty store on unauthenticate', () => {
  const newState = rootReducer(
    { auth: { isAuthenicated: true } },
    { type: UNAUTHENTICATE }
  )
  expect(newState).toEqual(rootReducer(undefined, { type: 'Anything' }))
})
