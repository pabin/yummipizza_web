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
import Message from '../../components/Message'

import { userSignupAPI } from '../../api/AccountsAPIs';
import { userAuthenticationSuccess } from '../../store/actions/AuthenticationActions';


// Signup modal component to show, signup form when user has no account
class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      registering: false,
      registerFailed: false,
      registered: false,
      showSuccessMessage: false,
    }

  }

  onUserSignup = () => {
    let images = [
      "https://www.freeiconspng.com/uploads/flat-user-icon-11.png",
      "https://skuvi.com/wp-content/uploads/2017/03/default-user-2.png",
      "https://p7.hiclipart.com/preview/312/283/679/avatar-computer-icons-user-profile-business-user-avatar.jpg",
      "https://cdn.clipart.email/fcc8ead276ddb30d657f23845cd2e028_avatar-icon-of-flat-style-available-in-svg-png-eps-ai-icon-_512-512.png",
      "https://i.ya-webdesign.com/images/avatar-png-1.png"
    ]
    let imageIndex = Math.floor((Math.random() * 5) + 1);

    const { username, password, firstName, lastName } = this.state
    const data = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      user_image: images[imageIndex-1]
    }

    console.log('data', data);
    this.setState({registering: true })
    userSignupAPI(data)
    .then(response => {
      if (response.data) {

        setTimeout(() => {
          this.setState({showSuccessMessage: true, registered: true, registering: false})
        }, 1000);

        setTimeout(() => {
          this.setState({showSuccessMessage: false})
          const userDetails = response.data
          const token = userDetails.token
          const userid = (userDetails.user.id).toString()
          const user = userDetails.user
          this.props.onAuthSuccess(token, user)

          localStorage.setItem('token', token)
          localStorage.setItem('userid', userid)
          localStorage.setItem('username', user.username)
          localStorage.setItem('userAuthenticated', true)
          localStorage.setItem('user', JSON.stringify(user))
        }, 2000);



        this.setState({username: "", password: "", firstName: "", lastName: "" })

      } else if (response.error) {
        setTimeout(() => {
          this.setState({registerFailed: true, registering: false})
        }, 1000);
      }
    })
  }

  render() {
    const { show, onHide } = this.props
    const { username, password, firstName, lastName, registering, registerFailed, registered, showSuccessMessage } = this.state

    if (!registering && !registered) {
      return (
        <Modal show={show} onHide={onHide} centered>
          <div style={{padding: '15px'}}>
            <Modal.Header closeButton>
              <h5>Create Yummi Pizza account</h5>
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

              <Form>
                <Form.Group controlId="formBasicFirstName">
                  <Row>
                    <Col sm={4}>
                      <Form.Label>First Name</Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        value={firstName}
                        onChange={(e) => this.setState({firstName: e.target.value})}
                        type="text"
                        placeholder="First Name" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                  <Row>
                    <Col sm={4}>
                      <Form.Label>Last Name</Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        value={lastName}
                        onChange={(e) => this.setState({lastName: e.target.value})}
                        type="text"
                        placeholder="Last Name" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Row>
                    <Col sm={4}>
                      <Form.Label>Username</Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        value={username}
                        onChange={(e) => this.setState({username: e.target.value})}
                        type="text"
                        placeholder="Username" />
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
                        value={password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        type="password"
                        placeholder="Password" />
                    </Col>
                  </Row>
                </Form.Group>

                {
                  registerFailed ?
                  <Alert variant="danger" style={{padding: '8px'}}>
                    User Signup Error, Try again !
                  </Alert>
                  : null
                }

              </Form>
            </Modal.Body>
            <Modal.Footer>
              { username && password && firstName && lastName ?
                <Button variant="primary" onClick={this.onUserSignup} block>Sign Up</Button>
                :
                <Button disabled={true} variant="primary"block>Sign Up</Button>
               }
              </Modal.Footer>
            </div>
          </Modal>
        );

    } else if (registering) {
      return (
        <FullScreenLoading show={registering} message="Creating Account..." />
      )
    } else if (registered) {
      return (
        <Message
          successMessage={"Signup Successful !"}
          showSuccessMessage={showSuccessMessage}
           />
      )
    }
  }
}

const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  onAuthSuccess: (token, user) => userAuthenticationSuccess(token, user),
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
