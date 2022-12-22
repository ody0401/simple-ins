import { Typography } from 'antd';
import {
  PlusSquareOutlined,
  HomeOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
import { animateScroll as scroll } from 'react-scroll';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addPostAPI, addPostsAPI } from '../../actions/post';
import { allRemovePost } from '../../slice/post';
import { DivFixed, DivWrapper, SpanWrapper } from './styles';
import UploadModal from '../UploadModal';
import { logout } from '../../slice/user';

const { Title } = Typography;

function NavBar() {
  const dispatch = useAppDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const createFaker = useCallback(async () => {
    dispatch(addPostsAPI());
  }, [dispatch]);

  const onClickHome = useCallback(() => {
    scroll.scrollToTop();
  }, []);

  const onClickReset = useCallback(() => {
    dispatch(allRemovePost());
  }, [dispatch]);

  const onClickLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <DivFixed>
      <DivWrapper>
        <Title level={3} onClick={onClickHome}>
          <HomeOutlined />
          <SpanWrapper>홈</SpanWrapper>
        </Title>
      </DivWrapper>
      <DivWrapper>
        <Title level={3} onClick={openModal}>
          <PlusSquareOutlined />
          <SpanWrapper>만들기</SpanWrapper>
        </Title>
      </DivWrapper>
      <DivWrapper>
        <Title level={3} onClick={createFaker}>
          <PlusSquareOutlined />
          <SpanWrapper>더미데이터 만들기</SpanWrapper>
        </Title>
      </DivWrapper>
      <DivWrapper>
        <Title level={3} onClick={onClickReset}>
          <MinusSquareOutlined />
          <SpanWrapper>초기화</SpanWrapper>
        </Title>
      </DivWrapper>
      <DivWrapper>
        <Title level={3} onClick={onClickLogout}>
          <MinusSquareOutlined />
          <SpanWrapper>로그아웃</SpanWrapper>
        </Title>
      </DivWrapper>
      <UploadModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </DivFixed>
  );
}

export default NavBar;
