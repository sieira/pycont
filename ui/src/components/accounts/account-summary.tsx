import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Account } from '../../store/accounts/types'
import { Spinner, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { patchAccount } from '../../store/accounts/actions'

interface StateProps {
  account: Account
}

interface DispatchProps {
  patchData: () => void
}

class AccountSummary extends React.Component<StateProps & DispatchProps> {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.account.name,
      balance: this.props.account.balance
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleSubmit(event: FormEvent): void {
    event.preventDefault()
    // Guess what has changed
    let _this = this
    const diff = Object.keys(this.props.account).reduce(
      function(obj, key) {
        if (
          _this.state.hasOwnProperty(key) &&
          _this.props.account[key] !== _this.state[key]
        ) {
          obj[key] = _this.state[key]
        }
        return obj
      },
      { id: _this.props.account.id }
    )
    this.props.patchData(diff)
  }

  render() {
    return this.state.isEditing ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              value={this.state.balance}
              onChange={e => this.setState({ balance: e.target.value })}
            />
          </Form.Group>
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
    )
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<PycontState, any, any>
): DispatchProps => ({
  patchData: account => dispatch(patchAccount(account))
})

export default connect(null, mapDispatchToProps)(AccountSummary)
