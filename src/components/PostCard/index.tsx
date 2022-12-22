import { useAppSelector } from '../../store/hooks';
import PostCardItems from '../PostCardItems';

function PostCard() {
  const posts = useAppSelector((state) => state.post.posts);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <PostCardItems key={post.id} post={post} />;
        })}
    </>
  );
}

export default PostCard;
