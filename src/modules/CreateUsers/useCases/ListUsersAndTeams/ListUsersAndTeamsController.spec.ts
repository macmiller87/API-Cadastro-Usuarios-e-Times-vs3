/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma/prisma.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../infra/app.module';

let prismaService: PrismaService;
let appModule: AppModule;

let app: INestApplication;

describe('ListUserAndTeams, (Tests End to End)', () => {

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

  it('Should be able to List a UserAndTeams, if User already exists and user is Authenthicate, and (user_id) is correct !', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Fanny Wilson',
      userAvatar: 'Wilson',
      email: 'fetsi@ote.fm',
      password: '8899',
    });

    const createUsertoken = await request(app.getHttpServer()).post('/users/userToken').send({
      email: user.body.userProps.email,
      password: '8899'
    });

    const { token } = createUsertoken.body;

    const listUser = await request(app.getHttpServer()).get('/users/listUserAndTeams').query({
      user_id: user.body._user_id

    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(201);
    expect(listUser.body).toHaveProperty('userName', 'Fanny Wilson');
    expect(listUser.body).toHaveProperty('userAvatar', 'Wilson');
  });

  it('Should be able to List a UserAndTeams, if (user_id) is incorrect !', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Kevin Lawrence',
      userAvatar: 'Lawrence',
      email: 'sodbid@mowsoit.ki',
      password: '4399',
    });

    const createUsertoken = await request(app.getHttpServer()).post('/users/userToken').send({
      email: user.body.userProps.email,
      password: '4399'
    });

    const { token } = createUsertoken.body;

    const listUser = await request(app.getHttpServer()).get('/users/listUserAndTeams').query({
      user_id: process.env.FAKE_ID,
      
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(listUser.body).toStrictEqual({ statusCode: 404, message: 'User Not Found!' });
  });

  it('Should be able to List a UserAndTeams, if user not have a valid! (Token) !', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Kevin Lawrence',
      userAvatar: 'Lawrence',
      email: 'sodbid@mowsoit.ki',
      password: '4399',
    });

    const createUsertoken = await request(app.getHttpServer()).post('/users/userToken').send({
      email: user.body._user_id,
      password: '4399'
    });

    const { fakeToken } = createUsertoken.body;

    const listUser = await request(app.getHttpServer()).get('/users/listUserAndTeams').query({
      user_id: user.body._user_id

    }).set({
      Authorization: `Bearer ${fakeToken}`
    });

    expect(listUser.body).toStrictEqual({ statusCode: 400, message: 'Invalid Token' });
  });

});