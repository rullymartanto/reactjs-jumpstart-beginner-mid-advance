import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';

import { userService } from '../../../_services/user.service';
// import { history, config } from '../../_helpers/default';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
      error: false
    };

    userService.logout();
}

  
  onhandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  onDismiss = () => {
    this.setState({ error: false })
  }

  Submit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      userService.login(email, password)
        .then(res => {
          this.setState({ redirectToReferrer: true });
        }, error => {
          this.setState({ error: true })
        })
    }
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.Submit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Enter Email" autoComplete="email" value={this.state.email} onChange={this.onhandleChange} required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={this.state.password} onChange={this.onhandleChange} required />
                      </InputGroup>
                      <InputGroup>
                        <Alert color="danger" isOpen={this.state.error} toggle={this.onDismiss}>
                          Error ! Wrong user or password !!
                          </Alert>
                      </InputGroup>
                      <InputGroup>
                        <Button color="primary" className="px-4">Login</Button>
                      </InputGroup>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
