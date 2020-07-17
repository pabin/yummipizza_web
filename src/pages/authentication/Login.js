import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

import logo from '../../assets/logo/logo_cropped.png';
import FullScreenLoading from '../../components/FullScreenLoading'

import { userAuthentication } from '../../store/actions/AuthenticationActions';



// Login modal component to show, login form when user is not authenticated
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
    }

  }

  onLoginButtonPress = () => {
    const { username, password } = this.state
    this.props.dispatchUserAuthentication(username, password)
  }


  render() {
    const { authentication: {
      userAuthenticated,
      userAuthenticating,
      authenticationFailed,
      // errorMessage,
      user,
      // token,
    }} = this.props

    const { show, onHide, onSignupPress } = this.props

    if (!userAuthenticating) {
      return (
        <Modal show={show} onHide={onHide} centered>
          <div style={{padding: '15px'}}>
            <Modal.Header closeButton>
              {
                userAuthenticated ?
                <h5>Welcome, {user.username}</h5>
                :
                <h5>Login before shopping</h5>
              }
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={logo}
                  style={{padding: '20px', marginBottom: '30px'}}
                  width="70%"
                  height="auto"
                  className="d-inline-block align-top"
                  alt="Site Brand logo"
                  />
              </div>

              {
                !userAuthenticated ?

                <Form>
                  <Form.Group controlId="formBasicUsername">
                    <Row>
                      <Col sm={4}>
                        <Form.Label>Username</Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          value={this.state.username}
                          onChange={(e) => this.setState({username: e.target.value})}
                          type="text"
                          placeholder="Username"  />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Row>
                      <Col sm={4}>
                        <Form.Label>Password</Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          value={this.state.password}
                          onChange={(e) => this.setState({password: e.target.value})}
                          type="password"
                          placeholder="Password" />
                      </Col>
                    </Row>
                  </Form.Group>
                  {
                    authenticationFailed ?
                    <Alert variant="danger" style={{padding: '8px'}}>
                      Login failure, Try again !
                    </Alert>
                    : null
                  }
                </Form>

                : userAuthenticated ?
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fa fa-check-circle fa-2x" style={{color: '#27AE60', padding: '10px'}}></i>
                    <h5  style={{paddingTop: '5px'}}>Login Successful !</h5>
                  </div>
                : null
              }

            </Modal.Body>
              {
                userAuthenticated ?
                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide} block>Close</Button>
                </Modal.Footer>
                :
                <Modal.Footer>
                <Button variant="primary" onClick={this.onLoginButtonPress} block>Login</Button>
                <Button variant="secondary" onClick={onSignupPress} block>SignUp</Button>
              </Modal.Footer>
              }
          </div>
        </Modal>
      );
    } else if (userAuthenticating) {
      return (
        <FullScreenLoading show={userAuthenticating} message="Authenticating..." />
      )
    }
  }
}


const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  dispatchUserAuthentication: (username, password) => userAuthentication(username, password),
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
