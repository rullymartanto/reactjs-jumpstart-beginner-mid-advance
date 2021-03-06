import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
// CardFooter
import { userService } from '../../../_services/user.service';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      Repassword: '',
      loading: false,
      error: false,
      errorText: '',
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss() {
    this.setState({ error: false })
  }

  handleChange(e) {

    const { id, value } = e.target

    var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
    var test = reg.test(value);


    this.setState({ [id]: value }, () => {
      if (id === 'password') {
        if (test) {
          this.setState({ error: false })
        } else {
          this.setState({ error: true, errorText: 'Password Weak !' })
        }
      }
    })



  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true })
    if (this.state.password !== this.state.Repassword) {
      this.setState({ loading: false, error: true, errorText: 'Password Not Match!' })
      return;
    }
    if (this.state.error === false) {
      userService.RegisterUser(this.state)
        .then(res => {
          this.setState({ success: true, loading: false, password: '', Repassword: '', email: '', username: '' })
        }, error => {
          this.setState({ loading: false, error: true, errorText: 'Register Error!' })
        })
    }

  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit} >
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="username" autoComplete="username" id="username" value={this.state.username} onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" id='password' value={this.state.password} onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" id='Repassword' value={this.state.Repassword} onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup>
                      <Alert color="danger" isOpen={this.state.error} toggle={this.onDismiss}>
                        {this.state.errorText}
                      </Alert>
                      <Alert color="success" isOpen={this.state.success} toggle={this.onSuccess}>
                        Register Success !
                      </Alert>
                    </InputGroup>
                    <Button type="submit" color="success" block>Create Account</Button>
                    <Button color="primary" onClick={() => this.props.history.push('/login')} block>Back To Login Page</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
