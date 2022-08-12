export type FormType = {
  signUp: boolean;
}

export type SignupType = {
  email: string;
  password: string;
}

export type LoginType = {
  email: string;
  password: string;
}

export type ServerResData = {
  message: string;
  token: string;
}

export type ResponseType = {
  config: any;
  data: ServerResData;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}