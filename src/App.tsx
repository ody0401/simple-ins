import AppLayout from './components/AppLayout';
import PostCard from './components/PostCard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addPostsAPI } from './actions/post';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(addPostsAPI());
    }
  }, [inView, dispatch]);

  return (
    <AppLayout>
      <div>
        <PostCard />
      </div>
      <div ref={ref}></div>
    </AppLayout>
  );
}
