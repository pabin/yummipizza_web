export const USER_AUTHENTICATION_SUCCESS = 'USER_AUTHENTICATION_SUCCESS'
export const USER_AUTHENTICATION_FAILURE = 'USER_AUTHENTICATION_FAILURE'
export const USER_AUTHENTICATING = 'USER_AUTHENTICATING'
export const USER_AUTHENTICATION_LOGOUT = 'USER_AUTHENTICATION_LOGOUT'


const initialState = {
  userAuthenticated: false,
  userAuthenticating: false,
  authenticationFailed: false,
  errorMessage: '',
  token: '',
  user: {},
}

export default (state = initialState, action) => {
  switch(action.type) {

    case USER_AUTHENTICATION_SUCCESS:
    return {
      ...initialState,
      userAuthenticated: true,
      token: action.token,
      user: action.user,
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

    case USER_AUTHENTICATION_LOGOUT:
    return {
      ...initialState,
    }

    default:
      return state
  }
}
