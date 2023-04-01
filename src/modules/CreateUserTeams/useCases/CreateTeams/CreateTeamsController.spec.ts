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

describe('Create a Team, (Tests End to End)', () => {

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
        const deleteTeam = prismaService.teams.deleteMany();

        await prismaService.$transaction([deleteUser]);
        await prismaService.$transaction([deleteTeam]);
    });

    it('Should be able to Create a Team, If have a valid User, and this User have a valid token', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Isaac Lewis',
            userAvatar: 'Lewis',
            email: 'jaibja@burho.me',
            password: '4321'
        });

        const createUserToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'jaibja@burho.me',
            password: '4321'
        });

        const { token } = createUserToken.body;

        const createTeam = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C. Juventus',
            city: 'Napoli',
            country: 'Italy',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(201);
        expect(createTeam.body).toHaveProperty('_team_id');
        expect(createTeam.body.teamsProps.teamName).toMatch('F. C. Juventus');
    });

    it('Should be not able to Create a Team, If (TeamName) is already in register !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Fannie Gibson',
            userAvatar: 'Gibson',
            email: 'vif@ene.je',
            password: '9832'
        });

        const createUserToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'vif@ene.je',
            password: '9832'
        });

        const { token } = createUserToken.body;

        await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C. Juventus',
            city: 'Napoli',
            country: 'Italy',
            user_id: user.body._user_id,

        }).set({
            Authorization: `Bearer ${token}`
        });

        const createTeam2 = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C. Juventus',
            city: 'Napoli',
            country: 'Italy',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(createTeam2.body).toStrictEqual({ statusCode: 404, message: 'Team Already Exists!' });
    });

    it('Should be not able to Create a Team, If User isnt have a valid Token !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Matthew Clarke',
            userAvatar: 'Clarke',
            email: 'cugjiposu@we.be',
            password: '2677'
        });

        const createUserToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'cugjiposu@we.be',
            password: '2677'
        });

        const { FakeToken } = createUserToken.body;

        const createTeam = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C. Milan',
            city: 'Milão',
            country: 'Italy',
            user_id: user.body._user_id,

        }).set({
            Authorization: `Bearer ${FakeToken}`
        });

        expect(createTeam.body).toStrictEqual({ statusCode: 400, message: 'Invalid Token' });
    });

});