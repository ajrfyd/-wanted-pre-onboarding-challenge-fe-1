import { modifyToggle } from "./actions";

export type State = {
  modify: boolean;
  modifyId: string;
};

export type ActionType = 
  | ReturnType<typeof modifyToggle>;