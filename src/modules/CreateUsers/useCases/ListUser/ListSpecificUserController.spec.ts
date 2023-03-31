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

describe('List Specific User, (Tests End to End)', () => {

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

    it('Should be able to List a SpecificUser, if User already exists and user is Authenthicate, and (user_id) is correct !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
          userName: 'Vernon Newman',
          userAvatar: 'Newman',
          email: 'ri@kete.pk',
          password: '1122',
        });

        const createUsertoken = await request(app.getHttpServer()).post('/users/userToken').send({
          email: 'ri@kete.pk',
          password: '1122'
        });

        const { token } = createUsertoken.body;

        const listUser = await request(app.getHttpServer()).get('/users/listSpecificUser').query({
          user_id: user.body._user_id
          
        }).set({
          Authorization: `Bearer ${token}`
        });

        expect(201);
        expect(listUser.body).toHaveProperty('userName','Vernon Newman');
        expect(listUser.body).toHaveProperty('userAvatar', 'Newman');
    });

    it('Should not be able to List a SpecificUser, if (user_id) is incorrect !', async () => {
      const user = await request(app.getHttpServer()).post('/users').send({
        userName: 'Henry May',
        userAvatar: 'May',
        email: 'joh@huofbaz.nf',
        password: '7822',
      });

      const createUsertoken = await request(app.getHttpServer()).post('/users/userToken').send({
        email: 'joh@huofbaz.nf',
        password: '7822'
      });

      const { token } = createUsertoken.body;

      const listUser = await request(app.getHttpServer()).get('/users/listSpecificUser').query({
        user_id: process.env.FAKE_ID

      }).set({
        Authorization: `Bearer ${token}`
      });

      expect(listUser.body).toStrictEqual({ statusCode: 404, message: 'User Not Found !' });
    });

    it('Should not be able to List a SpecificUser, if user not have a valid! (Token) !', async () => {
      const user = await request(app.getHttpServer()).post('/users').send({
        userName: 'Bessie Quinn',
        userAvatar: 'Quinn',
        email: 'nod@wiwa.ad',
        password: '6742',
      });

      const createUsertoken = await request(app.getHttpServer()).post('/users/userToken').send({
        email: 'nod@wiwa.ad',
        password: '6742'
      });

      const { fakeToken } = createUsertoken.body;

      const listUser = await request(app.getHttpServer()).get('/users/listSpecificUser').query({
        user_id: user.body._user_id

      }).set({
        Authorization: `Bearer ${fakeToken}`
      });

      expect(listUser.body).toStrictEqual({ statusCode: 400, message: 'Invalid Token' });
    });

});

