export const USER_AUTHENTICATION_SUCCESS = 'USER_AUTHENTICATION_SUCCESS'
export const USER_AUTHENTICATION_FAILURE = 'USER_AUTHENTICATION_FAILURE'
export const USER_AUTHENTICATING = 'USER_AUTHENTICATING'


const initialState = {
  userAuthenticated: false,
  userAuthenticating: false,
  authenticationFailed: false,
  errorMessage: '',
  token: '',
  username: '',
  userid: '',
}

export default (state = initialState, action) => {
  switch(action.type) {

    case USER_AUTHENTICATION_SUCCESS:
    return {
      ...initialState,
      userAuthenticated: true,
      token: action.token,
      username: action.username,
      userid: action.userid,
    }

    case USER_AUTHENTICATING:
    return {
      ...initialState,
      userAuthenticating: true,
    }

    case USER_AUTHENTICATION_FAILURE:
    return {
      ...initialState,
      authenticationFailed: true,
      errorMessage: action.errorMessage,
    }

    default:
      return state
  }
}
