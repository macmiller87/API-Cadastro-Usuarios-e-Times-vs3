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

describe('Delete User, (Tests End to End)', () => {

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

    it('Should be able to delete a User, if user is Authenthicate, and (user_id) is correct !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Danny Henry',
            userAvatar: 'Henry',
            email: 'wes@oce.to',
            password: '2096'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'wes@oce.to',
            password: '2096'
        });

        const { token } = createToken.body;

        const deleteUser = await request(app.getHttpServer()).delete('/users/deleteUser').query({
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(deleteUser.statusCode).toBe(200)
    });

    it('Should be not able to delete a User, if (user_id) is incorrect !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Cornelia Hernandez',
            userAvatar: 'Hernandez',
            email: 'aj@daibota.cl',
            password: '1144'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'aj@daibota.cl',
            password: '1144'
        });

        const { token } = createToken.body;

        const deleteUser = await request(app.getHttpServer()).delete('/users/deleteUser').query({
            user_id: process.env.FAKE_ID

        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(deleteUser.body).toStrictEqual({ statusCode: 404, message: 'User Not Found !' });
    });

    it('Should be not able to delete a User, if user not have a valid (Token) !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Cornelia Hernandez',
            userAvatar: 'Hernandez',
            email: 'aj@daibota.cl',
            password: '1144'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'aj@daibota.cl',
            password: '1144'
        });

        const { fakeToken } = createToken.body;

        const deleteUser = await request(app.getHttpServer()).delete('/users/deleteUser').query({
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${fakeToken}`
        })

        expect(deleteUser.body).toStrictEqual({ statusCode: 400, message: 'Invalid Token' });
    });

});
