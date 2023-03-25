/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import { UserController } from '@controller/User.controller';
import { CreateUsers } from '../CreateUsers/CreateUsers';
import { AuthenticateUsersToken } from './CreateUsersToken';
import { UserDatabaseModule } from '@database/user_database.module';
import { UserTokenDatabaseModule } from '@database/userToken-database.module';
import { ListSpecifcUser } from '../ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from '../ListUsersAndTeams/ListUsersAndTeams';
import { DeleteUsers } from '../DeleteUsers/DeleteUsers';
import { AppError } from '@utils/errors/AppError';

let prismaService: PrismaService;
let userController: UserController;
let createUser: CreateUsers;
let createUserToken: AuthenticateUsersToken;

describe('Create a UserToken, (Tests End to End)', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDatabaseModule, UserTokenDatabaseModule],
      controllers: [UserController],
      providers: [
        CreateUsers,
        ListSpecifcUser,
        ListUsersAndTeams,
        DeleteUsers,
        AuthenticateUsersToken,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userController = module.get<UserController>(UserController);
    createUser = module.get<CreateUsers>(CreateUsers);
    createUserToken = module.get<AuthenticateUsersToken>(AuthenticateUsersToken);
  });

  it('Controller should be defined', () => {
    expect(userController).toBeDefined();
  });

  afterAll(async () => {
    const deleteUser = prismaService.users.deleteMany();

    await prismaService.$transaction([deleteUser]);
  });

  it('Should be able to create a UserToken, if user already exists, and email and password is correct!', async () => {
    const user = await createUser.execute({
      userName: 'Madruga',
      userAvatar: 'Madruguinha',
      email: 'madruguinha@gmail.com',
      password: '7945',
    });

    const userTokenAuthenthicate = await createUserToken.execute({
      email: user.user.email,
      password: '7945',
    });

    expect(201);
    expect(userTokenAuthenthicate.user).toHaveProperty('userName', 'Madruga');
    expect(userTokenAuthenthicate.user).toHaveProperty('email', 'madruguinha@gmail.com');
    expect(userTokenAuthenthicate).toHaveProperty('token');
  });

  it('Should be not be able to create a UserToken, if user non exists, or email is incorrect!', async () => {
    await createUser.execute({
      userName: 'Mary Tucker',
      userAvatar: 'Tucker',
      email: 'forke@velru.be',
      password: '3443',
    });

    await expect(
       createUserToken.execute({
        email: 'Fake Email',
        password: '3443',
      }),
    ).rejects.toEqual(new AppError('User Email Not Found or Incorrect !', 404));
  });

  it('Should be not able to Create a User, if Username already exists or in use !', async () => {
    const user = await createUser.execute({
      userName: 'Blanche Kim',
      userAvatar: 'Kim',
      email: 'pasrujuh@ofapav.ne',
      password: '3945',
    });

    await expect(
      createUserToken.execute({
       email: user.user.email,
       password: 'Fake Password',
     }),
   ).rejects.toEqual(new AppError('Password Incorrect !', 404));
  });
});
