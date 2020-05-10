import React from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import { Spinner, ListGroup } from 'react-bootstrap'

import { PycontState } from '../../store/types'
import { Account } from '../../store/accounts/types'
import { fetchAccounts } from '../../store/accounts/actions'
import AccountSummary from './account-summary'

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

  render(): JSX.Element {
    return (
      <>
        <h2>Accounts</h2>
        <div aria-busy={!this.props.fetched} aria-live="polite">
          {!this.props.fetched ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <ListGroup>
              {this.props.accounts.map((account) => (
                <ListGroup.Item key={account.id}>
                  <AccountSummary account={account} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: PycontState): StateProps => ({
  accounts: state.accounts.accountList,
  fetched: state.accounts.fetched,
})

const mapDispatchToProps = (
  dispatch: Dispatch<PycontState, {}, Action>
): DispatchProps => ({
  fetchData: (): Promise<void> => dispatch(fetchAccounts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountList)
