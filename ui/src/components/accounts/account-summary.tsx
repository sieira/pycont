import React from 'react'
import { connect } from 'react-redux'
import { Account } from '../../store/accounts/types'
import { Spinner, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'

export default class AccountSummary extends React.Component<StateProps> {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.account.name,
      balance: this.props.account.balance
    }

    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit() {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }))
  }

  render() {
    return this.state.isEditing ? (
      <Form>
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
          <Button onClick={this.toggleEdit}>
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
