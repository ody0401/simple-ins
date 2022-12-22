import { Button, Form, Input, Typography } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { joinAPI } from '../../actions/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import { DivWrapper } from './styles';
function Join() {
  const dispatch = useAppDispatch();
  const { joinSuccessMsg, joinError } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onFinish = useCallback(() => {
    dispatch(joinAPI({ name, email, password }));
  }, [email, password, dispatch]);

  useEffect(() => {
    joinSuccessMsg ? setSuccess(joinSuccessMsg) : setSuccess('');
    joinError ? setError(joinError) : setError('');
  }, [joinSuccessMsg, joinError]);

  return (
    <DivWrapper>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>회원가입</Typography.Title>
        </Form.Item>
        <Form.Item
          name="name"
          label="이름"
          rules={[
            {
              required: true,
              message: '이름을 입력해 주세요',
            },
          ]}
        >
          <Input value={name} onChange={onChangeName} />
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
        {success && <Form.Item style={{ color: 'blue' }}>{success}</Form.Item>}
        {error && <Form.Item style={{ color: 'red' }}>{error}</Form.Item>}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            확인
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Link to={'/login'}>로그인 하러 가기</Link>
        </Form.Item>
      </Form>
    </DivWrapper>
  );
}

export default Join;
