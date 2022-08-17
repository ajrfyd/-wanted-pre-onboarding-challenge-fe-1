import { useMutation, UseMutationOptions } from "react-query"
import { reqLogin, reqSignup } from "./api"
import { ServerResData,  LoginType } from "./type";
import { AxiosError } from 'axios';

export const useLoginMutation = (options?: UseMutationOptions<ServerResData, AxiosError, LoginType>) => {
  return useMutation<ServerResData, AxiosError, LoginType>(reqLogin, options);
}