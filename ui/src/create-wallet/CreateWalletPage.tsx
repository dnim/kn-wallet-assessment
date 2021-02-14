import React, { Component } from "react"
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, Row } from "reactstrap"
import { WalletCreateResponse } from "../dto/WalletCreateResponse"
import { WalletService } from "../wallet/WalletService"
import { withRouter, RouteComponentProps } from 'react-router'

interface CreateWalletPageProps extends RouteComponentProps {
  walletService: WalletService;
}

interface CreateWalletPageState {
  name: string;
  nameIsInvalid: boolean;
}

class CreateWalletPage extends Component<CreateWalletPageProps, CreateWalletPageState> {

  state = {
    name: "",
    nameIsInvalid: false
  }

  handleCreation = async () => {
    const response: WalletCreateResponse = await this.props.walletService.create({
      id: -1,
      name: this.state.name,
      balance: 0.00
    })
    if (response.status.isError) {
      alert(response.status.message)
    } else {
      this.props.history.push("/");
    }
  }

  handleNameChange = (event: any) => {
    const name: string = event.target.value;
    this.setState({ name: event.target.value, nameIsInvalid: name.length === 0 })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <InputGroup size="sm" >
              <Input
                invalid={this.state.nameIsInvalid}
                type="text"
                maxLength={30}
                bsSize="sm"
                value={this.state.name}
                onChange={this.handleNameChange} />
              <InputGroupAddon addonType="append">
                <Button
                  size="sm"
                  color="primary"
                  disabled={this.state.name.length === 0}
                  onClick={() => this.handleCreation()}>create</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(CreateWalletPage);