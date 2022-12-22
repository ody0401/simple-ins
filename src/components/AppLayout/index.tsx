import { PropsWithChildren, useEffect } from 'react';
import { Col } from 'antd';
import NavBar from '../NavBar';
import { RowWrapper } from './styles';
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

function AppLayout({ children }: PropsWithChildren) {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <>
      {user ? (
        <RowWrapper>
          <Col xs={0} md={6} xl={4}>
            <NavBar />
          </Col>
          <Col xs={24} md={18} xl={16}>
            {children}
          </Col>
          <Col xs={0} md={0} xl={4} />
        </RowWrapper>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default AppLayout;
