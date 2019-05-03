import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { userService } from '../../../_services/user.service';
// import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.username}</Link></th>
      <td><Link to={userLink}>{user.email}</Link></td>
      <td><Link to={userLink}>{user.status}</Link></td>
    </tr>
  )
}

class Users extends Component {

  state = {
    users: [],
    error: false
  }

  componentDidMount() {
    userService.UserGrid()
      .then(res => {
        this.setState({ users: res.data });
      }, error => {
        console.log(error.message)
        console.log(error.response.status);
        userService.logout();
        this.props.history.push('/login')
        // this.setState({ error: true })
      })
  }

  render() {

    const userList = this.state.users.length > 0 ? this.state.users : [] 

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted"></small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user} />
                    )}
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

export default Users;
