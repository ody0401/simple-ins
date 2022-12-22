import { User } from '../slice/user';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

const UserData: User[] = [];

export function join(
  data: Pick<User, 'name' | 'email' | 'password'>,
): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser: User[] = UserData.filter(
        (v) => v.email === data.email,
      );
      if (existingUser.length > 0) {
        reject('이미 존재하는 아이디 입니다');
      } else {
        UserData.push({
          id: nanoid(),
          name: data.name,
          email: data.email,
          password: data.password,
          avatar: faker.image.avatar(),
        });
        resolve('회원가입에 성공하셨습니다');
      }
    }, 500);
  });
}

export function login(
  data: Pick<User, 'email' | 'password'>,
): Promise<Omit<User, 'password'>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result: User[] = UserData.filter(
        (v) => v.email === data.email && v.password === data.password,
      );
      if (result.length === 0) {
        reject('존재하지 않는 이메일이거나 비밀번호가 일치하지 않습니다');
      } else {
        const { password, ...userWithoutPassword } = result[0];
        resolve(userWithoutPassword);
      }
    }, 500);
  });
}
