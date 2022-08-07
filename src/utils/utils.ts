import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TodoType } from "../pages/todo/todoTypes";
import axios, { AxiosError } from "axios";

export const validEmail = (email: string): boolean => {
  
  return false;
}

export const useLogin = () => {
  const { login } = useSelector((state: RootState) => state);
  return login;
};

export const useTodo = () => {
  const { todo } = useSelector((state: RootState) => state);
  return todo;
}

export const email_reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// export const pwd_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const pwd_reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const getTodoList = async () => {
  const localData = await localStorage.getItem('userState');
  if(!localData) return [];
  const { token } = JSON.parse(localData);
  const { data } = await axios.get('http://localhost:8080/todos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}