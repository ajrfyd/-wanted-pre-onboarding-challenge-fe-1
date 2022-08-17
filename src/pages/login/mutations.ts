import { useMutation } from "react-query";
import baseReqApi from "../../api/axios";
import { ResponseType, SignupType } from "./type";


// export const signupMutation = useMutation<ResponseType, AxiosError, SignupType>((userInfo: SignupType) => {
//   return baseReqApi.post('/users/create', userInfo);
// }, {
//   onSuccess: (data) => {
//     if(data.status === 200) {
//       setAlertText(data.data.message + '. 가입하신 정보로 로그인 해 주세요.');
//       setIsOpen(true);
//       setTimeout(() => navigate('/') ,3000)
//     }
//   },
//   onError: (e) => {
//     console.log(e);
//   }
// })


// export const loginMutation = useMutation<ResponseType, AxiosError, LoginType>((userInfo: LoginType): Promise<ResponseType> => {
//   return baseReqApi.post('/users/login', userInfo);
// }, {
//   onSuccess: (resData, reqData) => {
//     if(resData && resData.status === 200) {
//       const { data: { token } } = resData;
//       const { email } = reqData;

//       const userInfo = {
//         email,
//         token
//       }

//       localStorage.setItem('userState', JSON.stringify(userInfo));
//       dispatch(reqLogin(email));
//       navigate('/todo', {
//         replace: true
//       });
//     }
//   },
//   onError: (e) => {
//     setAlertText('이메일 혹은 비밀번호가 정확하지 않습니다.')
//     setIsOpen(true);
//     // throw new Error(e.message);
//   },
// });

export {};