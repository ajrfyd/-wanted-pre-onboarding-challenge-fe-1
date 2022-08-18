import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TodoType } from "../pages/todo/todoTypes";
import axios, { AxiosError } from "axios";
import baseReqApi from "../api/axios";


export const useLoginState = () => {
  const { login } = useSelector((state: RootState) => state);
  return login;
};

export const useTodoState = () => {
  const { todo } = useSelector((state: RootState) => state);
  return todo;
}

// export const pwd_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const getTodoList = async () => {
  const localData = await localStorage.getItem('userState');
  if(!localData) return [];
  const { token } = JSON.parse(localData);
  const { data } = await baseReqApi.get('/todos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}

export const setLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
}
