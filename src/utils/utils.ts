import { useSelector } from "react-redux";
import { RootState } from "../store";

export const validEmail = (email: string): boolean => {
  
  return false;
}

export const useLogin = () => {
  const { login } = useSelector((state: RootState) => state);
  return login;
}

export const email_reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// export const pwd_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const pwd_reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;