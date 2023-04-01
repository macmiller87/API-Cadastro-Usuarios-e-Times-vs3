/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { InmemoryTeamsRepository } from '@modules/CreateUserTeams/repositories/In-memory/In-memory-TeamsRepository';
import { CreateTeams } from './CreateTeams';
import { InMemoryUsersRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersRepository';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { InMemoryUsersTokenRepository } from '@modules/CreateUsers/repositories/In-memory/In-memory-UsersTokenRepository';
import { AppError } from '@utils/errors/AppError';

let inMemoryTeamsRepository: InmemoryTeamsRepository;
let createTeams: CreateTeams;

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryUserTokenRepository: InMemoryUsersTokenRepository;
let createUser: CreateUsers;
let createUserToken: AuthenticateUsersToken;

describe('Create a Team (Unit Tests)', () => {
    
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
  });

  it('Should be able to Create a Team, If have a valid User, and this User have a valid token', async () => {
    const user = await createUser.execute({
        userName: 'Bernice Doyle',
        userAvatar: 'Doyle',
        email: 'zurnel@leotukuc.it',
        password: '9889'
    });

    await createUserToken.execute({
        email: user.user.email,
        password: '9889'
    });

    const createTeam = await createTeams.execute({
        teamName: 'S. C. Corinthians Paulista',
        city: 'São Paulo',
        country: 'Brasil',
        user_id: user.user.user_id
    });

    expect(201);
    expect(createTeam.team).toHaveProperty('team_id');
    expect(createTeam.team.TeamName).toMatch('S. C. Corinthians Paulista');

    inMemoryTeamsRepository.deleteTeam(createTeam.team.team_id);
    inMemoryUserRepository.deleteUser(createTeam.team.user_id);
    inMemoryUserTokenRepository.deleteUserId(createTeam.team.user_id);
  });

  it('Should be not able to Create a Team, If (TeamName) is already in register !', async () => {
    const user = await createUser.execute({
        userName: 'Jacob Stokes',
        userAvatar: 'Stokes',
        email: 'muluthi@je.tt',
        password: '1299'
    });

    await createUserToken.execute({
        email: user.user.email,
        password: '1299'
    });

    const createTeam = await createTeams.execute({
        teamName: 'F. C. Barcelona',
        city: 'Barcelona',
        country: 'Espanha',
        user_id: user.user.user_id
    });

    await expect(
      createTeams.execute({
        teamName: 'F. C. Barcelona',
        city: 'Barcelona',
        country: 'Espanha',
        user_id: user.user.user_id
      }),
    ).rejects.toEqual(new AppError('Team Already Exists!', 404));

    inMemoryTeamsRepository.deleteTeam(createTeam.team.team_id);
    inMemoryUserRepository.deleteUser(createTeam.team.user_id);
    inMemoryUserTokenRepository.deleteUserId(createTeam.team.user_id);
  });

});
