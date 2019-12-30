import accountsReducer from './reducer'
import { fetchData } from './actions'

describe('Test accounts reducer', () => {
  it('Should reduce in fetchData', () => {
    expect(accountsReducer({}, fetchData([]))).toEqual({
      accountList: [],
      fetched: true
    })
  })
})
