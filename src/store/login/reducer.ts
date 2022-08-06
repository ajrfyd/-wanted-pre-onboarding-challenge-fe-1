import { StateType, ActionType } from "./types";
import { 
  NEED_LOG_IN, 
  NEED_SIGN_UP, 
  REQ_LOG_IN, 
  REQ_LOG_OUT,
  OPEN_MODAL,
  CLOSE_MODAL 
} from './actions';

const initialState: StateType = {
  signUp: false,
  loginState: {
    login: false,
    info: {
      email: ''
    }
  },
  alert: false
}

const loginReducer = (state: StateType = initialState, action: ActionType) => {
  switch(action.type) {
    case NEED_SIGN_UP:
    return {
      ...state,
      signUp: true
    }
    case NEED_LOG_IN:
      return {
        ...state,
        signUp: false
      }
    case REQ_LOG_IN:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          login: true,
          info: {
            ...state.loginState.info,
            email: action.payload
          }
        }
      }
    case REQ_LOG_OUT:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          login: false,
          info: {
            ...state.loginState.info,
            email: ''
          }
        }
      }
    case OPEN_MODAL: 
      return {
        ...state,
        alert: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        alert: false,
      }
    default:
      return state;
  }
};

export default loginReducer;