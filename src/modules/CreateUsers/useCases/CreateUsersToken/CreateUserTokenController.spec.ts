/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../infra/app.module';

let prismaService: PrismaService;
let appModule: AppModule;

let app: INestApplication;
describe('Create a UserToken, (Tests End to End)', () => {
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    appModule = module.get<AppModule>(AppModule);

    app = module.createNestApplication({
      logger: false,
    });

    await app.init();
  });

  it('Controller should be defined', () => {
    expect(appModule).toBeDefined();
  });

  afterAll(async () => {
    const deleteUser = prismaService.users.deleteMany();

    await prismaService.$transaction([deleteUser]);
  });

  it('Should be able to create a UserToken, if user already exists, and email and password is correct!', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Madruga',
      userAvatar: 'Madruguinha',
      email: 'madruguinha@gmail.com',
      password: '7945',
    });

    const userTokenAuthenthicate = await request(app.getHttpServer()).post('/users/userToken').send({
      email: 'madruguinha@gmail.com',
      password: '7945',
    });

    expect(201);
    expect(userTokenAuthenthicate.body.user).toHaveProperty('userName', 'Madruga');
    expect(userTokenAuthenthicate.body.user).toHaveProperty('email', 'madruguinha@gmail.com');
    expect(userTokenAuthenthicate.body).toHaveProperty('token');
  });

  it('Should not be able to Create a UserToken, if user non exists, or email is incorrect!', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Mary Tucker',
      userAvatar: 'Tucker',
      email: 'forke@velru.be',
      password: '3443',
    });

    const userToken =  await request(app.getHttpServer()).post('/users/userToken').send({
      email: 'Fake Email',
      password: user.body.userProps.password,
    });

    expect(userToken.body).toStrictEqual({ statusCode: 404, message: 'User Email Not Found or Incorrect !' });
  });

  it('Should not be able to Create a UserToken, if user non exists, or password is incorrect !', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Blanche Kim',
      userAvatar: 'Kim',
      email: 'pasrujuh@ofapav.ne',
      password: '3945',
    });

    const userToken = await request(app.getHttpServer()).post('/users/userToken').send({
      email: 'pasrujuh@ofapav.ne',
      password: 'Fake Password',
    });

    expect(userToken.body).toStrictEqual({ statusCode: 404, message: 'Password Incorrect !' });
  });

});
