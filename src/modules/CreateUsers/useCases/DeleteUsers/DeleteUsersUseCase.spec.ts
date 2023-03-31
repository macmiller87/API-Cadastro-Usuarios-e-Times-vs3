/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from '../CreateUsersToken/CreateUsersToken';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';
import { AppError } from '@utils/errors/AppError';
import { DeleteUsers } from './DeleteUsers';

let inMemoryUserRepository: InMemoryUsersRepository;
let createUser: CreateUsers;
let deleteUser: DeleteUsers;

let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let createUserToken: AuthenticateUsersToken;

describe('Delete User (Unit Tests)', () => {

    beforeEach(async () => {
        inMemoryUserRepository = new InMemoryUsersRepository();
        createUser = new CreateUsers(inMemoryUserRepository);
        deleteUser = new DeleteUsers(inMemoryUserRepository);

        inMemoryUserTokenRepository = new InMemoryUsersTokenRepository();
        createUserToken = new AuthenticateUsersToken(
            inMemoryUserRepository,
            inMemoryUserTokenRepository
        );
    });

    it('Should be able to delete a User, if user is Authenthicate, and (user_id) is correct !',  async () => {
        const user = await createUser.execute({
            userName: 'Darrell Pearson',
            userAvatar: 'Pearson',
            email: 'anorpa@zucapse.my',
            password: '6521'
        });

        const createToken = await createUserToken.execute({
            email: user.user.email,
            password: '6521'
        });

        await inMemoryUserRepository.deleteUser(createToken.user.user_id);
        await inMemoryUserTokenRepository.deleteUserId(user.user.user_id);

        expect(200);
    });

    it('Should be not able to delete a User, if (user_id) is incorrect !',  async () => {
        const user = await createUser.execute({
            userName: 'Ola Briggs',
            userAvatar: 'Briggs',
            email: 'sofva@fof.ni',
            password: '9977'
        });

        await createUserToken.execute({
            email: user.user.email,
            password: '9977'
        });

        await expect(
            deleteUser.execute(process.env.FAKE_ID)
        ).rejects.toEqual(new AppError('User Not Found !', 404));

        await inMemoryUserRepository.deleteUser(user.user.user_id);
        await inMemoryUserTokenRepository.deleteUserId(user.user.user_id);
    });

});