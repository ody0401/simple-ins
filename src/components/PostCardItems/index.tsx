import { nanoid } from 'nanoid';
import { Avatar } from 'antd';
import { Post, removePost } from '../../slice/post';
import {
  CloseOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
} from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import ReplyModal from '../ReplyModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  DivPostHeader,
  DivWrapper,
  SliderWrapper,
  SpanWrapper,
} from './styles';

interface Props {
  post: Post;
}

function PostCardItems({ post }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const settings = useMemo(() => {
    return {
      arrows: false,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  }, []);

  const iconMargin = useMemo(
    () => ({ fontSize: '24px', marginLeft: '5px' }),
    [],
  );

  const dispatch = useAppDispatch();

  const [heartIcon, setHeartIcon] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClickHeart = useCallback(() => {
    setHeartIcon((prev) => !prev);
  }, []);

  const onClickRemovePost = useCallback(() => {
    dispatch(removePost(post.id));
  }, [dispatch, post.id]);

  return (
    <DivWrapper key={nanoid()}>
      <DivPostHeader>
        <div>
          <Avatar size={40} src={post.avatar} />
          <SpanWrapper>{post.name}</SpanWrapper>
        </div>
        <div>
          {user?.email === post.email && (
            <CloseOutlined
              style={{ fontSize: '16px', margin: '10px 5px 0 0' }}
              onClick={onClickRemovePost}
            />
          )}
        </div>
      </DivPostHeader>
      <div>
        <SliderWrapper {...settings}>
          {post.imageSrc.map((image) => {
            return <img key={nanoid()} src={image} />;
          })}
        </SliderWrapper>
      </div>
      <div>
        {heartIcon ? (
          <HeartTwoTone
            style={iconMargin}
            twoToneColor="#eb2f96"
            onClick={onClickHeart}
          />
        ) : (
          <HeartOutlined style={iconMargin} onClick={onClickHeart} />
        )}
        <MessageOutlined style={iconMargin} onClick={openModal} />
      </div>
      <div>
        <span
          style={{
            fontWeight: 'bold',
            paddingLeft: '5px',
            marginRight: '10px',
          }}
        >
          {post.replies[0].name}
        </span>
        <span>{post.replies[0].reply}</span>
      </div>
      <div>
        <div
          style={{ paddingLeft: '5px', color: 'gray', cursor: 'pointer' }}
          onClick={openModal}
        >{`댓글 ${post.replies.length}개 모두 보기`}</div>
      </div>
      <div>
        <ReplyModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          postId={post.id}
          replies={post.replies}
        />
      </div>
    </DivWrapper>
  );
}

export default PostCardItems;
