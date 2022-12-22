import { faker } from '@faker-js/faker';
import { Post } from '../slice/post';
import { nanoid } from 'nanoid';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function createPost() {
  const name = faker.name.fullName();
  const email = `${name}@test.com`;
  const avatar = faker.image.avatar();
  const id = nanoid();
  const randNum = getRandomInt(1, 4);
  const imageSrc: string[] = [];
  for (let i = 0; i < randNum; i++) {
    imageSrc.push(faker.image.animals(640, 480, true));
  }
  const replies = [{ name, email, avatar, reply: faker.lorem.lines(1) }];

  return { id, name, avatar, imageSrc, email, replies };
}

export function addPost(data: Omit<Post, 'id'>): Promise<Post> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = nanoid();
      resolve({
        id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        imageSrc: data.imageSrc,
        replies: data.replies,
      });
    }, 500);
  });
}

export function addPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts: Post[] = [];
      for (let i = 0; i < 5; i++) {
        posts.push(createPost());
      }
      resolve(posts);
    }, 300);
  });
}
