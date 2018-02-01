import { CreateUserDto } from '../../dto/create-user.dto';

export const usersFixture: Array<CreateUserDto> = [
  {
    email: 'test1@test.com',
    firstName: 'test1',
    lastName: 'test1',
    password: 'test1',
    confirmPassword: 'test1',
  },
  {
    email: 'test2@test.com',
    firstName: 'test2',
    lastName: 'test2',
    password: 'test2',
    confirmPassword: 'test2',
  },
  {
    email: 'test3@test.com',
    firstName: 'test3',
    lastName: 'test3',
    password: 'test3',
    confirmPassword: 'test3',
  }
];
