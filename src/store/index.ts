import { combineReducers } from "redux";
import loginReducer from "./login/reducer";
import todoReducer from "./todo/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  todo: todoReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;