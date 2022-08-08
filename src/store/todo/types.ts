import { modifyToggle, formToggle } from "./actions";

export type State = {
  modify: boolean;
  modifyId: string;
};

export type ActionType = 
  | ReturnType<typeof modifyToggle>
  | ReturnType<typeof formToggle>