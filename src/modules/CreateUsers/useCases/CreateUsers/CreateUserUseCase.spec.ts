import 'dotenv/config';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { AppError } from '@utils/errors/AppError';
import { CreateUsers } from './CreateUsers';

let inMemoryUserRepository: InMemoryUsersRepository;
let createUser: CreateUsers;

describe('Create a User (Unit tests)', () => {
  inMemoryUserRepository = new InMemoryUsersRepository();
  createUser = new CreateUsers(inMemoryUserRepository);

  it('Should be able to Create a User', async () => {
    const user = await createUser.execute({
      userName: 'Seu Madruga',
      userAvatar: 'Madruguinha',
      email: 'madruguinha@gmail.com',
      password: '2334',
    });
    expect(201);
    expect(user.user).toHaveProperty('user_id');
    expect(user.user.email).toMatch('madruguinha@gmail.com');
  });

  it('Should be not be able to Create a User, if Username already exists or in use', async () => {
    await createUser.execute({
      userName: 'Kiko',
      userAvatar: 'Tesouro',
      email: 'tesouuuro@gmail.com',
      password: '6543',
    });

    await expect(
      createUser.execute({
        userName: 'Kiko',
        userAvatar: 'Tesouro',
        email: 'tesouro@gmail.com',
        password: '7887',
      }),
    ).rejects.toEqual(new AppError('User Already Exists!', 404));
  });
});
