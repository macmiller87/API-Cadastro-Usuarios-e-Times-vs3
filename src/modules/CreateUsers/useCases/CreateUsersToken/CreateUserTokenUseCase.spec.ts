/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';
import { AppError } from '@utils/errors/AppError';

let inMemoryUserRepository: InMemoryUsersRepository;
let createUser: CreateUsers;

let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let createUserToken: AuthenticateUsersToken;

describe('Create UserToken (Unit tests)', () => {
  inMemoryUserRepository = new InMemoryUsersRepository();
  createUser = new CreateUsers(inMemoryUserRepository);

  inMemoryUserTokenRepository = new InMemoryUsersTokenRepository();
  createUserToken = new AuthenticateUsersToken(
    inMemoryUserRepository,
    inMemoryUserTokenRepository,
  );

  it('Should be able to create a UserToken, if user already exists, and email and password is correct!', async () => {
    const user = await createUser.execute({
      userName: 'Madruga',
      userAvatar: 'Madruguinha',
      email: 'madruguinha@gmail.com',
      password: '8788',
    });

    const userTokenAuthenthicate = await createUserToken.execute({
      email: user.user.email,
      password: '8788',
    });

    expect(201);
    expect(userTokenAuthenthicate.user).toHaveProperty('userName', 'Madruga');
    expect(userTokenAuthenthicate.user).toHaveProperty('email', 'madruguinha@gmail.com');
    expect(userTokenAuthenthicate).toHaveProperty('token');
  });

  it('Should be not be able to create a UserToken, if user non exists, or email is incorrect!', async () => {
    await createUser.execute({
      userName: 'Luke Houston',
      userAvatar: 'Houston',
      email: 'ahatalce@arolopa.tf',
      password: '1221',
    });

    await expect(
       createUserToken.execute({
        email: 'Fake Email',
        password: '1221',
      }),
    ).rejects.toEqual(new AppError('User Email Not Found or Incorrect !', 404));
  });

  it('Should be not be able to create a UserToken, if user non exists, or password is incorrect!', async () => {
    const user = await createUser.execute({
      userName: 'Delia Hunter',
      userAvatar: 'Hunter',
      email: 'zigibmi@ro.co.uk',
      password: '6554',
    });

    await expect(
       createUserToken.execute({
        email: user.user.email,
        password: 'Fake Password',
      }),
    ).rejects.toEqual(new AppError('Password Incorrect !', 404));
  });
});
