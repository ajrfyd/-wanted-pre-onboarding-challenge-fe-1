import baseReqApi from './axios';

export type UserSubmitFormType = {
  email: string;
  password: string;
}

export type PromiseReturnTypeUser = {
  message: string;
  token: string;
}

export const logIn = async ({ email, password }: UserSubmitFormType): Promise<PromiseReturnTypeUser> => {
  const { data } = await baseReqApi.post('/user/login', { email, password });
  return data;
};

export const signUp = async ({ email, password }: UserSubmitFormType): Promise<PromiseReturnTypeUser> => {
  const { data } = await baseReqApi.post('/user/create', { email, password} );
  return data;
};