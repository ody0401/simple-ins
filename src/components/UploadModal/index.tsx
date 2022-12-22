import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import Modal from 'react-modal';
import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input } from 'antd';
import { faker } from '@faker-js/faker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nanoid } from 'nanoid';
import { addPostAPI } from '../../actions/post';
import { DivContentWrapper, DivReplyWrapper, DivWrapper } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    padding: 0,
  },
};

Modal.setAppElement('#root');

interface Props {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function UploadModal({ modalIsOpen, setIsOpen }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [reply, setReply] = useState('');
  const [imageSrc, setImageSrc] = useState([
    faker.image.animals(640, 480, true),
  ]);

  const onChangeReply = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  }, []);
  const closeModal = useCallback(() => {
    setReply('');
    setImageSrc([faker.image.animals(640, 480, true)]);
    setIsOpen(false);
  }, []);

  const onFinish = useCallback(() => {
    if (user) {
      const replies = [
        { email: user.email, name: user.name, reply, avatar: user.avatar },
      ];
      dispatch(
        addPostAPI({
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          imageSrc,
          replies,
        }),
      );
      setReply('');
      setImageSrc([faker.image.animals(640, 480, true)]);
      closeModal();
    }
  }, [imageSrc, reply]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Form style={{ width: '100%', height: '100%' }} onFinish={onFinish}>
        <DivWrapper>
          <CloseOutlined style={{ fontSize: '20px' }} onClick={closeModal} />
        </DivWrapper>
        <DivContentWrapper>
          <div>
            {imageSrc.map((v) => (
              <img key={nanoid()} width={'100%'} height={'100%'} src={v} />
            ))}
          </div>
          <DivReplyWrapper>
            <div>
              <Avatar style={{ marginRight: '5px' }} src={user?.avatar} />
              <span>{user?.name}</span>
            </div>
            <div>
              <Input.TextArea
                showCount
                maxLength={100}
                style={{ resize: 'none', height: '100%' }}
                value={reply}
                onChange={onChangeReply}
              />
            </div>
            <div>
              <Button type={'primary'} htmlType={'submit'}>
                공유
              </Button>
            </div>
          </DivReplyWrapper>
        </DivContentWrapper>
      </Form>
    </Modal>
  );
}

export default UploadModal;
