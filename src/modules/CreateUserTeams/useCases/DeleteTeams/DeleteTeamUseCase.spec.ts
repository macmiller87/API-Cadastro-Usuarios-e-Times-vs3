/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { InmemoryTeamsRepository } from '@modules/CreateUserTeams/repositories/In-memory/In-memory-TeamsRepository';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateTeams } from '@modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { DeleteTeam } from './DeleteTeam';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';

let inMemoryTeamsRepository: InmemoryTeamsRepository;
let createTeams: CreateTeams;
let deleteTeam: DeleteTeam;

let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let inMemoryUserRepository: InMemoryUsersRepository;
let createUser: CreateUsers;
let createUserToken: AuthenticateUsersToken;

describe('Delete team (Unit Tests)', () => {

    beforeEach(async () => {
        inMemoryUserRepository = new InMemoryUsersRepository();
        inMemoryUserTokenRepository = new InMemoryUsersTokenRepository();
        createUser = new CreateUsers(inMemoryUserRepository);

        createUserToken = new AuthenticateUsersToken(
            inMemoryUserRepository,
            inMemoryUserTokenRepository
        );

        inMemoryTeamsRepository = new InmemoryTeamsRepository();
        createTeams = new CreateTeams(
            inMemoryTeamsRepository,
            inMemoryUserRepository
        );

        deleteTeam = new DeleteTeam(inMemoryTeamsRepository);
    });

    it('Should be able to Delete a Team, if have a valid User, and this user have a valid token, and the (team_id) is valid for team already register !', async () => {
        const user = await createUser.execute({
            userName: 'Anthony Hopkins',
            userAvatar: 'Hopkins',
            email: 'doewohov@ulobva.sj',
            password: '2277'
        });

        await createUserToken.execute({
            email: 'doewohov@ulobva.sj',
            password: '2277'
        });

        const createTeam = await createTeams.execute({
            teamName: 'F. C. Porto',
            city: 'Porto',
            country: 'Portugal',
            user_id: user.user.user_id
        });

        await deleteTeam.execute(createTeam.team.team_id);

        expect(200);
        
        inMemoryTeamsRepository.deleteTeam(createTeam.team.team_id);
        inMemoryUserRepository.deleteUser(createTeam.team.user_id);
        inMemoryUserTokenRepository.deleteUserId(createTeam.team.user_id);
    });

    it('Should be not able to Delete a Team, if the (team_id) is isnt valid for team already register !', async () => {
        const user = await createUser.execute({
            userName: 'Joshua Wong',
            userAvatar: 'Wong',
            email: 'fuk@ren.nf',
            password: '4378'
        });

        await createUserToken.execute({
            email: 'fuk@ren.nf',
            password: '4378'
        });

        const createTeam = await createTeams.execute({
            teamName: 'F. C. Benfica',
            city: 'Porto',
            country: 'Portugal',
            user_id: user.user.user_id
        });

        await expect(
            deleteTeam.execute(process.env.FAKE_ID)
        ).rejects.toEqual({ statusCode: 404, message: 'Team Not Found !' });
        
        inMemoryTeamsRepository.deleteTeam(createTeam.team.team_id);
        inMemoryUserRepository.deleteUser(createTeam.team.user_id);
        inMemoryUserTokenRepository.deleteUserId(createTeam.team.user_id);
    });

});