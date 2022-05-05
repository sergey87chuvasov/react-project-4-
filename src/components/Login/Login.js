import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@'),
    };
  }

  return {
    value: '',
    isValid: false,
  };
};

const Login = (props) => {
  // исп useReducer для комбинирования этих двух состояний

  // const [inputEmail, setInputEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  ////////////////////////////////////////////////////////

  const [inputPassword, setInputPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: '',
    isValid: undefined,
  });

  // useEffect
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFormIsValid(
  //       inputEmail.includes('@') && inputPassword.trim().length > 7
  //     );
  //   }, 1000);

  //   // функция очистки
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [inputEmail, inputPassword]);

  // const emailChangeHandler = (event) => {
  //   setInputEmail(event.target.value);

  //   // setFormIsValid(
  //   //   event.target.value.includes('@') && inputPassword.trim().length > 7
  //   // );
  // };

  const emailChangeHandler = (event) => {
    // setInputEmail(event.target.value);
    dispatchEmailState({ type: 'USER_INPUT', value: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && inputPassword.trim().length > 7
    );
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);

    setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmailState({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 7);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor='password'>Пароль</label>
          <input
            type='password'
            id='password'
            value={inputPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type='submit' className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
