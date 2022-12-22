import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input } from 'antd';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Modal from 'react-modal';
import { DivWrapper } from './styles';
import { addReply, Post, Reply } from '../../slice/post';
import { nanoid } from 'nanoid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
interface Props {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  postId: string;

  replies: Reply[];
}

function ReplyModal({ modalIsOpen, setIsOpen, postId, replies }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const customStyles = useMemo(
    () => ({
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '50%',
      },
    }),
    [],
  );

  const [reply, setReply] = useState('');

  const onChangeReply = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  }, []);

  const closeModal = useCallback(() => {
    setReply('');
    setIsOpen(false);
  }, [setIsOpen]);

  const onFinish = useCallback(() => {
    if (reply === null || reply.trim() === '') {
      alert('댓글을 입력하세요');
      return;
    }
    if (user) {
      dispatch(
        addReply({
          name: user.name,
          email: user.email,
          reply,
          postId,
          avatar: user.avatar,
        }),
      );
    }
  }, [reply]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <DivWrapper>
        <div>
          <div>댓글</div>
          <CloseOutlined onClick={closeModal} />
        </div>
        <div>
          {replies.map((reply) => {
            return (
              <div key={nanoid()}>
                <span>
                  <Avatar size={40} src={reply.avatar} />
                </span>
                <span style={{ fontWeight: 'bold', margin: '0 10px' }}>
                  {reply.name}
                </span>
                <span>{reply.reply}</span>
              </div>
            );
          })}
        </div>
        <Form onFinish={onFinish}>
          <Input
            size="large"
            placeholder="댓글"
            prefix={<UserOutlined />}
            value={reply}
            onChange={onChangeReply}
            required
          />
          <Button type="primary" style={{ float: 'right' }} htmlType={'submit'}>
            확인
          </Button>
        </Form>
      </DivWrapper>
    </Modal>
  );
}
export default ReplyModal;
