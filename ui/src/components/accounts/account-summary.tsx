import React from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { Account } from '../../store/accounts/types'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { patchAccount } from '../../store/accounts/actions'
import { PycontState } from '../../store/types'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

interface StateProps {
  account: Account
}

interface DispatchProps {
  patchData: (account: Account) => Promise<void>
}

class AccountSummary extends React.Component<StateProps & DispatchProps> {
  /*constructor(props:any) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.account.name,
      balance: this.props.account.balance,
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }*/

  toggleEdit(): void {
    //this.setState({ isEditing: !this.state.isEditing })
  }

  handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    // Guess what has changed
    const diff = Object.keys(this.props.account).reduce(
      (obj, key) => {
        if (
          true
          //{}.hasOwnProperty.call(this.state, key) &&
          //this.props.account[key] !== this.state[key]
        ) {
          //obj[key] = this.state[key]
        }
        return obj
      },
      { id: this.props.account.id }
    )
    this.props.patchData(diff)
  }

  renderTextbox(value:string, onChange:any): JSX.Element {
    return (
      <Form.Group>
        <Form.Control type="text" value={value} onChange={onChange} />
      </Form.Group>
    )
  }

  render(): JSX.Element {
    return <Form></Form>
    /*return this.state.isEditing ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          {this.renderTextbox(this.state.name, (e: JSX.Element): void =>
            this.setState({ name: e.target.value })
          )}
          {this.renderTextbox(this.state.balance, (e: JSX.Element): void =>
            this.setState({ balance: e.target.value })
          )}
          <Button type="submit">
            <FontAwesomeIcon icon="check-square" />
          </Button>
          <Button onClick={this.toggleEdit}>
            <FontAwesomeIcon icon="times" />
          </Button>
        </Form.Row>
      </Form>
    ) : (
      <>
        <span>{this.props.account.name}</span>
        <span>{this.props.account.balance}</span>
        <Button onClick={this.toggleEdit}>
          <FontAwesomeIcon icon="pencil-alt" />
        </Button>
      </>
    )*/
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<PycontState, {}, Action>
): DispatchProps => ({
  patchData: (account: Account): Promise<void> =>
    dispatch(patchAccount(account)),
})

export default connect(null, mapDispatchToProps)(AccountSummary)
