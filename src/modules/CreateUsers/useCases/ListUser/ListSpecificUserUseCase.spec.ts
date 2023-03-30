/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from '../CreateUsersToken/CreateUsersToken';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';
import { AppError } from '@utils/errors/AppError';
import { ListSpecifcUser } from './ListSpecifcUser';

let inMemoryUserRepository: InMemoryUsersRepository;
let createUser: CreateUsers;
let listSpecifcUser: ListSpecifcUser;

let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let createUserToken: AuthenticateUsersToken;

describe('ListSpecificUser (Unit tests)', () => {

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUser = new CreateUsers(inMemoryUserRepository);
    listSpecifcUser = new ListSpecifcUser(inMemoryUserRepository);

    inMemoryUserTokenRepository = new InMemoryUsersTokenRepository();
    createUserToken = new AuthenticateUsersToken(
      inMemoryUserRepository,
      inMemoryUserTokenRepository
    );
  });

  it('Should be able to List a SpecificUser, if User already exists and user is Authenthicate, and (user_id) is correct !', async () => {
    const user = await createUser.execute({
      userName: 'Lida Fernandez',
      userAvatar: 'Fernandez',
      email: 'hu@otpi.pf',
      password: '4334',
    });

    const createUsertoken = await createUserToken.execute({
      email: user.user.email,
      password: '4334'
    });

    const listUser = await inMemoryUserRepository.listSpecificUserById(createUsertoken.user.user_id);

    expect(201);
    expect(listUser).toHaveProperty('user_id');
    expect(listUser.userName).toMatch('Lida Fernandez');
    expect(listUser.userAvatar).toMatch('Fernandez');

    await inMemoryUserRepository.deleteUser(user.user.user_id);
    await inMemoryUserTokenRepository.deleteUserId(user.user.user_id);
  });

  it('Should not be able to List a SpecificUser, if (user_id) is incorrect !', async () => {
    const user = await createUser.execute({
      userName: 'Jeremy Stewart',
      userAvatar: 'Stewart',
      email: 'el@vahratlo.bi',
      password: '7865',
    });

    await createUserToken.execute({
      email: user.user.email,
      password: '7865'
    });

    await expect(
      listSpecifcUser.execute(process.env.FAKE_ID)
    ).rejects.toEqual(new AppError('User Not Found !', 404));

    await inMemoryUserRepository.deleteUser(user.user.user_id);
  });
  
});
