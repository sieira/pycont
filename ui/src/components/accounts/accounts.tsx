import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import { Spinner } from 'react-bootstrap'

import { PycontState } from '../../store/types'
import { Account } from '../../store/accounts/types'
import { fetchAccounts } from '../../store/accounts/actions'

interface StateProps {
  accounts: Account[]
  fetched: boolean
}

interface DispatchProps {
  fetchData: () => void
}

class AccountList extends React.Component<StateProps & DispatchProps> {
  componentDidMount(): void {
    if (!this.props.fetched) {
      this.props.fetchData()
    }
  }

  render() {
    return (
      <>
        <div aria-busy={!this.props.fetched} aria-live="polite">
          {!this.props.fetched ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <p>{JSON.stringify(this.props.accounts)}</p>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: PycontState): StateProps => ({
  accounts: state.accounts.accountList,
  fetched: state.accounts.fetched
})

const mapDispatchToProps = (
  dispatch: Dispatch<PycontState, any, any>
): DispatchProps => ({
  fetchData: () => dispatch(fetchAccounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountList)
