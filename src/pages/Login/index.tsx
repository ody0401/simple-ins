import { Button, Form, Input, Typography } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { loginAPI } from '../../actions/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { DivWrapper } from '../Join/styles';
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, loginDone, loginError } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onFinish = useCallback(() => {
    dispatch(loginAPI({ email, password }));
  }, [email, password, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    loginError ? setError(loginError) : setError('');
  }, [loginError]);

  return (
    <DivWrapper>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>로그인</Typography.Title>
        </Form.Item>
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: 'email',
              required: true,
              message: '이메일을 입력해 주세요',
            },
          ]}
        >
          <Input value={email} onChange={onChangeEmail} />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}
        >
          <Input type="password" value={password} onChange={onChangePassword} />
        </Form.Item>
        {error && <Form.Item style={{ color: 'red' }}>{error}</Form.Item>}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            확인
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Link to={'/join'}>회원가입</Link>
        </Form.Item>
      </Form>
    </DivWrapper>
  );
}

export default Login;
