import { MODIFY_TOGGLE, FORM_TOGGLE } from './actions';
import { State, ActionType } from "./types";
const initialState: State = {
  modify: false,
  modifyId: ''
}

const todoReducer = (state = initialState, action: ActionType) => {
  switch(action.type) {
    case MODIFY_TOGGLE:
      return {
        ...state,
        modify: !state.modify,
        modifyId: state.modify ? '' : action.payload
      }
    case FORM_TOGGLE:
      if(state.modifyId !== '') {
        return {
          ...state,
          modifyId: '',
        }
      }
      return {
        ...state,

      }
    default:
      return state;
  }
};

export default todoReducer;