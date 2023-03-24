import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@controller/User.controller';
import { CreateUsers } from './CreateUsers';
import { UserDatabaseModule } from '@database/user_database.module';
import { ListSpecifcUser } from '@modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from '@modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';
import { DeleteUsers } from '@modules/CreateUsers/useCases/DeleteUsers/DeleteUsers';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { UserTokenDatabaseModule } from '@database/userToken-database.module';
import { PrismaService } from '@database/prisma/prisma.service';
import { AppError } from '@utils/errors/AppError';

let prismaService: PrismaService;
let userController: UserController;
let createUser: CreateUsers;

describe('Create a User, (Tests End to End)', () => {
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
  });

  it('Controller should be defined', () => {
    expect(userController).toBeDefined();
  });

  afterAll(async () => {
    const deleteUser = prismaService.users.deleteMany();

    await prismaService.$transaction([deleteUser]);
  });

  it('Should be able to Create a User', async () => {
    const user = await createUser.execute({
      userName: 'Chavez',
      userAvatar: 'Chavinho',
      email: 'chaves@gmail.com',
      password: '6677',
    });

    expect(201);
    expect(user.user.userName).toBe('Chavez');
    expect(user.user).toHaveProperty('user_id');
    expect(user.user.email).toMatch('chaves@gmail.com');
  });

  it('Should be not able to Create a User, if Username already exists or in use !', async () => {
    await createUser.execute({
      userName: 'Chaves',
      userAvatar: 'Chavinho teste',
      email: 'teste@gmail.com',
      password: '9988',
    });

    await expect(
      createUser.execute({
        userName: 'Chaves',
        userAvatar: 'Chavinho teste',
        email: 'chavinho@gmail.com',
        password: '1122',
      }),
    ).rejects.toEqual(new AppError('User Already Exists!', 404));
  });
});
