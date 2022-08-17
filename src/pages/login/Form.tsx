import { useState, useRef } from 'react';
import styled from 'styled-components';
import Btn from '../../components/Btn';
import { email_reg, pwd_reg, signUpFormSubmitHandler, loginFormSubmitHandler, validPwd } from '../../utils/utils';
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
    email: '',
    password: '',
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


    // ! 
    // console.log('submit!')
    if(emailRef.current && signUp && passwordRef.current) {
      if(!emailRef.current.value || !passwordRef.current.value) emptyInputHandler();


      signupMutation.mutate({
              email: emailRef.current.value,
              password: passwordRef.current.value
            });
      // signUpFormSubmitHandler(emailRef.current.value, passwordRef.current.value);
    } else if(emailRef.current && !signUp && passwordRef.current) {
      if(!emailRef.current.value || !passwordRef.current.value) emptyInputHandler();
      // loginFormSubmitHandler(emailRef.current?.value, passwordRef.current?.value);
      loginMutation.mutate({
              email: emailRef.current.value,
              password: passwordRef.current.value
            })

    }
  }

  const validCheckOnBlur = (form: 'email' | 'password') => {
    if(!emailRef.current || !passwordRef.current) return;
    if(form === 'email' && emailRef.current.value.length <= 8) emailRef.current.focus();
    if(form === 'password' && passwordRef.current.value.length <= 8) passwordRef.current.focus();
  };

  const emailValidCheck = () => {
    if(!emailRef.current) return;
    if(emailRef.current.value.length <= 8) return;
    
    if(email_reg.test(emailRef.current.value)) {
      setValid(prev => ({ ...prev, email: '' }));
    } else {
      setValid(prev => ({ ...prev, email: '@, 특수문자 포함 8자 이상이어야 합니다.' }));
      emailRef.current.focus();
    }
  }

  const pwdValidCheck = () => {
    if(!passwordRef.current) return;
    if(passwordRef.current.value.length <= 8) return;

    const isValid = validPwd(passwordRef.current.value);

    isValid ? setValid(prev => ({ ...prev, password: '' })) : setValid(prev => ({ ...prev, password: '비밀번호는 특수문자를 포함한 8자 이상입니다.'}))
    // if(pwd_reg.test(passwordRef.current.value)) {
    //   if(!signUp) {
    //     setValid(prev => ({ ...prev, password: '', valid: true }));
    //   } else {
    //     setValid(prev => ({ ...prev, password: '' }));
    //   }
    // } else {
    //   setValid(prev => ({ ...prev, password: '비밀번호는 특수문자를 포함한 8자 이상입니다.' }));
    // }
  }

  const comparePwd = () => {
    if(!rePasswordRef.current || !passwordRef.current) return;
    if(rePasswordRef.current.value === '') return;
    if(passwordRef.current.value !== rePasswordRef.current.value) {
      rePasswordRef.current.focus();
      setValid(prev => ({ ...prev, password: '비밀번호가 일치하지 않습니다.' }));
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

  const emptyInputHandler = () => {
    setAlertText('모든 입력값은 필수 입니다.');
    setIsOpen(true);
    return;
  }

  
  return (
    <FormContainer >
      {valid.email}
      {valid.password}
      <FormBox onSubmit={submitHandler}>
        <label htmlFor="">
          이메일 주소 
          {/* {valid.email === true ? null : 'e-mail주소의 형식에 맞지 않습니다'} */}
        </label>
        <input type="text" ref={emailRef} onChange={emailValidCheck} onBlur={() => validCheckOnBlur('email')}/>
        <label htmlFor="">비밀번호</label>
        <input type="password" ref={passwordRef} onChange={pwdValidCheck} onBlur={() => validCheckOnBlur('password')}/>
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