import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import AuthContext from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const REQUEST_URL = BASE + USER + '/signin';

  const { onLogin } = useContext(AuthContext);

  const redirection = useNavigate();

  // 서버에 비동기 로그인 요청(AJAX 요청)
  // 함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴한다

  const fetchLogin = async () => {
    // 이메일, 비밀번호 입력 태그 취득하기
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');

    // await는 async로 선언된 함수에서만 사용이 가능하다
    // await는 프로미스 객체가 처리될 때까지 기다린다
    // 프로미스 객체의 반환값을 바로 활용할 수 있도록 도와준다
    // then()을 활용하는 것보다 가독성이 좋고, 작성하기도 쉽다
    const res = await fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    // 서버에서 전달된 json을 변수에 저장
    const { token, userName, email, role } = await res.json();

    // Context API를 사용하여 로그인 상태를 업데이트 한다
    onLogin(token, userName, role);

    // 홈으로 리다이렉트
    redirection('/');

    /*
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    */
  };

  const loginHandler = (e) => {
    e.preventDefault();
    // 입력값에 관련된 처리를 하고 싶다면 여기서 하면 된다
    // 예제에서는 생략

    // 서버에 로그인 요청 전송
    fetchLogin();
  };

  return (
    <Container component="main" maxWidth="xs" style={{ margin: '200px auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>

      <form noValidate onSubmit={loginHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="email address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="on your password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
