/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { InmemoryTeamsRepository } from '@modules/CreateUserTeams/repositories/In-memory/In-memory-TeamsRepository';
import { CreateTeams } from '@modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';
import { ListSpecificTeam } from './ListSpecificTeam';
import { AppError } from '@utils/errors/AppError';

let inMemoryTeamsRepository: InmemoryTeamsRepository;
let createTeams: CreateTeams;
let listSpecificTeam: ListSpecificTeam;

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let createUser: CreateUsers;
let createUserToken: AuthenticateUsersToken;

describe('List SpecificTeam (Unit Tests)', () => {

    beforeEach(async () => {
        inMemoryTeamsRepository = new InmemoryTeamsRepository();
        inMemoryUserRepository = new InMemoryUsersRepository();
        inMemoryUserTokenRepository = new InMemoryUsersTokenRepository();
    
        createUser = new CreateUsers(inMemoryUserRepository);
    
        createUserToken = new AuthenticateUsersToken(
            inMemoryUserRepository,
            inMemoryUserTokenRepository
        );
    
        createTeams = new CreateTeams(
          inMemoryTeamsRepository,
          inMemoryUserRepository,
        );

        listSpecificTeam = new ListSpecificTeam(inMemoryTeamsRepository);
    });

    it('Should be able to List a SpecificTeam, If have a valid User, and this User have a valid token, and the (Team_id) is valid for team already register ! ', async () => {
        const user = await createUser.execute({
            userName: 'Lillian Keller',
            userAvatar: 'Keller',
            email: 'ja@zazli.lr',
            password: '6611'
        });

        await createUserToken.execute({
            email: 'ja@zazli.lr',
            password: '6611'
        });

        const createTeam = await createTeams.execute({
            teamName: 'F. C. Inter de Milão',
            city: 'Milão',
            country: 'Italy',
            user_id: user.user.user_id
        });

        const listTeam = await listSpecificTeam.execute(createTeam.team.team_id);

        expect(201);
        expect(listTeam.TeamName).toMatch('F. C. Inter de Milão');
        expect(listTeam.country).toMatch('Italy');

        inMemoryTeamsRepository.deleteTeam(createTeam.team.team_id);
        inMemoryUserRepository.deleteUser(createTeam.team.user_id);
        inMemoryUserTokenRepository.deleteUserId(createTeam.team.user_id);
    });

    it('Should be not able to List a SpecificTeam, if the (Team_id) is isnt valid for team already register ! ', async () => {
        const user = await createUser.execute({
            userName: 'Verna Malone',
            userAvatar: 'Malone',
            email: 'matial@rahiske.lv',
            password: '6542'
        });

        await createUserToken.execute({
            email: 'matial@rahiske.lv',
            password: '6542'
        });

        const createTeam = await createTeams.execute({
            teamName: 'S. C. Corinthians Paulista',
            city: 'São Paulo',
            country: 'Brasil',
            user_id: user.user.user_id
        });

        await expect(
            listSpecificTeam.execute(process.env.FAKE_ID)
        ).rejects.toEqual(new AppError('Team Not Found !', 404));

        inMemoryTeamsRepository.deleteTeam(createTeam.team.team_id);
        inMemoryUserRepository.deleteUser(createTeam.team.user_id);
        inMemoryUserTokenRepository.deleteUserId(createTeam.team.user_id);
    });

});