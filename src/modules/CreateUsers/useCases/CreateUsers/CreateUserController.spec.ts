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

describe('Create a User, (Tests End to End)', () => {

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

  it('Should be able to Create a User', async () => {
    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Chavez',
      userAvatar: 'Chavinho',
      email: 'chaves@gmail.com',
      password: '6677',
    });

    expect(201);
    expect(user.body).toHaveProperty('_user_id');
    expect(user.body.userProps.userName).toBe('Chavez');
    expect(user.body.userProps.email).toMatch('chaves@gmail.com');
  });

  it('Should be not able to Create a User, if Username already exists or in use !', async () => {
    await request(app.getHttpServer()).post('/users').send({
      userName: 'Chiquinha',
      userAvatar: 'Chiquinha',
      email: 'chiquinha@gmail.com',
      password: '8923',
    });

    const user = await request(app.getHttpServer()).post('/users').send({
      userName: 'Chiquinha',
      userAvatar: 'Chiquinha teste',
      email: 'chiquinha@gmail.com',
      password: '1122',
    });
    
    expect(user.body).toStrictEqual({ statusCode: 404, message: 'User Already Exists!' });
  });

});
