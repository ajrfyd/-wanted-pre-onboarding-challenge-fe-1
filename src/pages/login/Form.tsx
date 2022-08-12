import { useState, useRef } from 'react';
import styled from 'styled-components';
import Btn from '../../components/Btn';
import { email_reg, pwd_reg, signUpFormSubmitHandler, loginFormSubmitHandler } from '../../utils/utils';
import { useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { reqLogin } from '../../store/login/actions';
import { useDispatch } from 'react-redux';
import Alert from '../../components/Alert';
import { FormType, SignupType, LoginType, ServerResData, ResponseType } from './type';
import baseReqApi from '../../api/axios';



const Form = ({ signUp }: FormType) => {
  const [valid, setValid] = useState({
    valid: false,
    email: false,
    password: false,
  });

  const [alertText, setAlertText] = useState('');


  const [isOpen, setIsOpen] = useState(false);

  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let rePasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(emailRef.current && passwordRef.current && rePasswordRef.current) {
    //   if(emailRef.current.value !== '' && passwordRef.current.value !== '' && rePasswordRef.current.value !== '') {
    //     signupMutation.mutate({
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value
    //     })
    //   } else {
    //     setAlertText('모든 값은 필수로 입력해야 합니다.')
    //     setIsOpen(true);
    //   }
    //   return;
    // }

    // if(emailRef.current && passwordRef.current) {
    //   if(emailRef.current.value !== '' && passwordRef.current.value !== '') {
    //     loginMutation.mutate({
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value
    //     })
    //   } else {
    //     setAlertText('모든 값은 필수로 입력해야 합니다.')
    //     setIsOpen(true);
    //   }
    // }
    if(emailRef.current && signUp && passwordRef.current) {
      signUpFormSubmitHandler(emailRef.current.value, passwordRef.current.value);
    } else if(emailRef.current && !signUp && passwordRef.current) {
      loginFormSubmitHandler(emailRef.current?.value, passwordRef.current?.value);
    }
  }

  const emailValidCheck = () => {
    if(!emailRef.current) return;
    if(email_reg.test(emailRef.current.value)) {
      setValid(prev => ({ ...prev, email: true }));
    } else {
      setValid(prev => ({ ...prev, email: false }));
      emailRef.current.focus();
    }
  }

  const pwdValidCheck = () => {
    if(!passwordRef.current) return;

    if(pwd_reg.test(passwordRef.current.value)) {
      if(!signUp) {
        setValid(prev => ({ ...prev, password: true, valid: true }));
      }
      setValid(prev => ({ ...prev, password: true }));
    } else {
      setValid(prev => ({ ...prev, password: false }));
      // passwordRef.current.focus();
    }
  }

  const comparePwd = () => {
    if(!rePasswordRef.current || !passwordRef.current) return;
    if(rePasswordRef.current.value === '') return;
    if(passwordRef.current.value !== rePasswordRef.current.value) {
      rePasswordRef.current.focus();
      setValid(prev => ({ ...prev, password: false }));
    } else {
      setValid(prev => ({ ...prev, valid: true }));
    }
  }

  const signupMutation = useMutation<ResponseType, AxiosError, SignupType>((userInfo: SignupType) => {
    return baseReqApi.post('/users/create', userInfo);
  }, {
    onSuccess: (data) => {
      if(data.status === 200) {
        setAlertText(data.data.message + '. 가입하신 정보로 로그인 해 주세요.');
        setIsOpen(true);
        setTimeout(() => navigate('/') ,3000)
      }
    },
    onError: (e) => {
      console.log(e);
    }
  })


  const loginMutation = useMutation<ResponseType, AxiosError, LoginType>((userInfo: LoginType): Promise<ResponseType> => {
    return baseReqApi.post('/users/login', userInfo);
  }, {
    onSuccess: (resData, reqData) => {
      if(resData && resData.status === 200) {
        const { data: { token } } = resData;
        const { email } = reqData;

        const userInfo = {
          email,
          token
        }

        localStorage.setItem('userState', JSON.stringify(userInfo));
        dispatch(reqLogin(email));
        navigate('/todo', {
          replace: true
        });
      }
    },
    onError: (e) => {
      setAlertText('이메일 혹은 비밀번호가 정확하지 않습니다.')
      setIsOpen(true);
      // throw new Error(e.message);
    },
  });

  
  return (
    <FormContainer >
      <FormBox onSubmit={submitHandler}>
        <label htmlFor="">
          이메일 주소 
          {/* {valid.email === true ? null : 'e-mail주소의 형식에 맞지 않습니다'} */}
        </label>
        <input type="email" ref={emailRef} onBlur={emailValidCheck}/>
        <label htmlFor="">비밀번호</label>
        <input type="password" ref={passwordRef} onBlur={pwdValidCheck}/>
        {
          signUp ? (
            <>
              <label htmlFor="">다시입력</label>
              <input type="password" ref={rePasswordRef} onBlur={comparePwd}/>
            </>
          ) : null
        }
        <Btn type='submit' >{ signUp ? '가입하기' : '로그인' }</Btn>
      </FormBox>
      <Alert message={alertText} isOpen={isOpen} setStateFunc={setIsOpen}/>      
    </FormContainer>
  )
}

export default Form;

const FormContainer = styled.div`
  /* border: 1px solid red; */
  width: 90%;
  display: flex;
  flex-direction: column;
`

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    font-size: 1rem;
    border: none;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
    border-radius: 3px;
    outline: none;
    padding: .3rem .5rem;
  }

  button {
    margin-top: 1rem;
  }
`