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

describe('Delete Team (End to end Tests)', () => {

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

    it('Should be able to Delete a Team, if have a valid User, and this user have a valid token, and the (team_id) is valid for team already register !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Bradley Turner',
            userAvatar: 'Turner',
            email: 'pizfehvom@jezromtap.lb',
            password: '2299'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'pizfehvom@jezromtap.lb',
            password: '2299'
        });

        const { token } = createToken.body;

        const createTeam = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'S. C. Corinthians Paulista',
            city: 'São Paulo',
            country: 'Brasil',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        await request(app.getHttpServer()).delete('/teams/deleteTeam').query({
            team_id: createTeam.body._team_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(200);
    });

    it('Should be not able to Delete a Team, if the (team_id) is isnt valid for team already register !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Luis Hoffman',
            userAvatar: 'Hoffman',
            email: 'fa@wuvnuleb.at',
            password: '8882'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'fa@wuvnuleb.at',
            password: '8882'
        });

        const { token } = createToken.body;

        await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C Barcelona',
            city: 'Barcelona',
            country: 'Espanha',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        const deleteTeam = await request(app.getHttpServer()).delete('/teams/deleteTeam').query({
            team_id: process.env.FAKE_ID

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(deleteTeam.body).toStrictEqual({ statusCode: 404, message: 'Team Not Found !' })
    });

    it('Should be not able to Delete a Team, If isnt have a valid User (Token) !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Harriett Dean',
            userAvatar: 'Dean',
            email: 'so@ro.cc',
            password: '2787'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'so@ro.cc',
            password: '2787'
        });

        const { token } = createToken.body;
        const { fakeToken } = createToken.body;

        const createTeam = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C Real Madrid',
            city: 'Madrid',
            country: 'Espanha',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        const deleteTeam = await request(app.getHttpServer()).delete('/teams/deleteTeam').query({
            team_id: createTeam.body._team_id

        }).set({
            Authorization: `Bearer ${fakeToken}`
        });

        expect(deleteTeam.body).toStrictEqual({ statusCode: 400, message: 'Invalid Token' });
    });

});