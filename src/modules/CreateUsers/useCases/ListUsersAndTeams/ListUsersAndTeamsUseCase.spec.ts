/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from '../CreateUsersToken/CreateUsersToken';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';
import { AppError } from '@utils/errors/AppError';
import { ListUsersAndTeams } from './ListUsersAndTeams';

let inMemoryUserRepository: InMemoryUsersRepository;
let createUser: CreateUsers;
let listUserAndTeams: ListUsersAndTeams;

let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let createUserToken: AuthenticateUsersToken;

describe('ListUserAndTeams (Unit tests)', () => {

    beforeEach(async () => {
        inMemoryUserRepository = new InMemoryUsersRepository();
        createUser = new CreateUsers(inMemoryUserRepository);
        listUserAndTeams = new ListUsersAndTeams(inMemoryUserRepository);
    
        inMemoryUserTokenRepository = new InMemoryUsersTokenRepository();
        createUserToken = new AuthenticateUsersToken(
          inMemoryUserRepository,
          inMemoryUserTokenRepository
        );
    });

    it('Should be able to List UserAndTeams, if User already exists and user is Authenthicate, and (user_id) is correct !', async () => {
        const user = await createUser.execute({
          userName: 'Jeff Clarke',
          userAvatar: 'Clarke',
          email: 'fi@toksaje.gq',
          password: '6697',
        });
    
        const createUsertoken = await createUserToken.execute({
          email: user.user.email,
          password: '6697'
        });
    
        const listUser = await inMemoryUserRepository.listUsersAndTeams(createUsertoken.user.user_id);
    
        expect(201);
        expect(listUser).toHaveProperty('user_id');
        expect(listUser.userName).toMatch('Jeff Clarke');
        expect(listUser.userAvatar).toMatch('Clarke');
    
        await inMemoryUserRepository.deleteUser(user.user.user_id);
        await inMemoryUserTokenRepository.deleteUserId(user.user.user_id);
    });

    it('Should not be able to List a SpecificUser, if (user_id) is incorrect !', async () => {
        const user = await createUser.execute({
          userName: 'Harry Greene',
          userAvatar: 'Greene',
          email: 'luseg@pavaj.aw',
          password: '9911',
        });
    
        await createUserToken.execute({
          email: user.user.email,
          password: '9911'
        });
    
        await expect(
          listUserAndTeams.execute(process.env.FAKE_ID)
        ).rejects.toEqual(new AppError('User Not Found!', 404));
    
        await inMemoryUserRepository.deleteUser(user.user.user_id);
    });

});