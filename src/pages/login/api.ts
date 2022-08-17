import { SignupType, ServerResData } from "./type";
import baseReqApi from "../../api/axios";

export const reqLogin = async (form: SignupType): Promise<ServerResData> => {
  return await baseReqApi.post('/users/login', form);
};

export const reqSignup = async (form: SignupType): Promise<ServerResData> => {
  return await baseReqApi.post('/users/create', form);
};