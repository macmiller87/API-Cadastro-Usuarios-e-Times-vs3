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

describe('List SpecificTeam, (Tests End to End)', () => {

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

    it('Should be able to List a SpecificTeam, If have a valid User, and this User have a valid token, and the (Team_id) is valid for team already register !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Hulda Sandoval',
            userAvatar: 'Sandoval',
            email: 'gefihce@ba.uz',
            password: '7722'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'gefihce@ba.uz',
            password: '7722'
        });

        const { token } = createToken.body;

        const createTeam = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C. Bayer de Munich',
            city: 'Munich',
            country: 'German',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listTeam = await request(app.getHttpServer()).get('/teams/listSpecificTeam').query({
            team_id: createTeam.body._team_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(201);
        expect(listTeam.body).toHaveProperty('team_id');
        expect(listTeam.body.TeamName).toMatch('F. C. Bayer de Munich');
        expect(listTeam.body.country).toMatch('German');
    });

    it('Should be not able to List a SpecificTeam, if the (Team_id) is isnt valid for team already register !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Maude Johnson',
            userAvatar: 'Johnson',
            email: 'piav@ihfen.pg',
            password: '9254'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'piav@ihfen.pg',
            password: '9254'
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

        const listTeam = await request(app.getHttpServer()).get('/teams/listSpecificTeam').query({
            team_id: process.env.FAKE_ID

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(listTeam.body).toStrictEqual({ statusCode: 404, message: 'Team Not Found !' });
    });

    it('Should be not able to List a SpecificTeam, If isnt have a valid User (Token) !', async () => {
        const user = await request(app.getHttpServer()).post('/users').send({
            userName: 'Jay Hicks',
            userAvatar: 'Hicks',
            email: 'fan@ha.lb',
            password: '3598'
        });

        const createToken = await request(app.getHttpServer()).post('/users/userToken').send({
            email: 'fan@ha.lb',
            password: '3598'
        });

        const { token } = createToken.body;
        const { fakeToken } = createToken.body;

        const createTeam = await request(app.getHttpServer()).post('/teams').send({
            teamName: 'F. C. Porto',
            city: 'Porto',
            country: 'Portugal',
            user_id: user.body._user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listTeam = await request(app.getHttpServer()).get('/teams/listSpecificTeam').query({
            team_id: createTeam.body._team_id

        }).set({
            Authorization: `Bearer ${fakeToken}`
        });

        expect(listTeam.body).toStrictEqual({ statusCode: 400, message: 'Invalid Token' })
    });

});