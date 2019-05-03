import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { userService } from '../../../_services/user.service';
// import usersData from './UsersData'

class User extends Component {
  state = {
    username: '',
    email: '',
    error: ''
  }
  componentDidMount() {
    userService.User(this.props.match.params.id)
      .then(res => {
        this.setState({ username: res.data.user.username, email: res.data.user.email});
      }, error => {
        this.setState({ error: true })
      })
  }

  render() {

    // const user = usersData.find(user => user.id.toString() === this.props.match.params.id)
    const user = this.state
    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      userDetails.map(([key, value]) => {
                        return (
                          key !== 'error' ?
                          <tr key={key}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                          : null
                        )
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
