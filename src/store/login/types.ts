import { 
  needSignup, 
  needLogin, 
  reqLogin, 
  reqLogout,
  openModal,
  closeModal 
} from './actions';

type StatePropsType = {
  login: boolean;
  info: {
    email: string;
  }
}

export type StateType = {
  signUp: boolean;
  loginState: StatePropsType;
  alert: boolean;
}

export type ActionType = 
  | ReturnType<typeof needSignup>
  | ReturnType<typeof needLogin>
  | ReturnType<typeof reqLogin>
  | ReturnType<typeof reqLogout>
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>