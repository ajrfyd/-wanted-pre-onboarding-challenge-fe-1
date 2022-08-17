import { SignupType, ServerResData } from "./type";
import baseReqApi from "../../api/axios";

export const reqLogin = async (form: SignupType): Promise<ServerResData> => {
  const { data } = await baseReqApi.post('/users/login', form);
  return data; 
};

export const reqSignup = async (form: SignupType): Promise<ServerResData> => {
  const { data } = await baseReqApi.post('/users/create', form);
  return data;
};