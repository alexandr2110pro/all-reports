import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import { clearCollection, dereferenceModel, loadFixtures } from '../schemas/user.schema';
import { AuthService } from '../../auth/auth.service';
import { IAccessToken } from '../../auth/interfaces/access-token.interface';
import { AuthModule } from '../../auth/auth.module';
import { usersFixture } from './lib/usersFixture';
import { CreateUserDto } from '../dto/create-user.dto';
import { HttpStatus } from '@nestjs/common';

jest.setTimeout(15000);

describe('Users', () => {

  let authService: AuthService;
  let accessToken: IAccessToken;
  let server;
  let app;


  beforeAll(async () => {
    server = express();
    server.use(bodyParser.json());

    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        AuthModule,
      ],
      components: [AuthService]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    app = module.createNestApplication(server);

    await app.init();
  });


  beforeEach(async () => {
    await clearCollection();
    await loadFixtures(usersFixture);
  });


  afterAll((done) => {
    dereferenceModel();
    app.close();
    setTimeout(done, 1000);
  });


  /* Create a new user */

  describe('POST /users', () => {
    const createUserData: CreateUserDto = {
      email: 'testCreate1@mail.com',
      firstName: 'testCreate1',
      lastName: 'testCreate1',
      password: 'testCreate1',
      confirmPassword: 'testCreate1',
    };

    it('should create a new user', () => {
      return request(server)
        .post('/users')
        .send(createUserData)
        .expect(HttpStatus.CREATED);
    });

    it(`email duplicate should return ${HttpStatus.CONFLICT}`, () => {
      const duplicateUserData: CreateUserDto = {
        email: usersFixture[0].email,
        firstName: 'testCreate2',
        lastName: 'testCreate2',
        password: 'testCreate2',
        confirmPassword: 'testCreate2',
      };

      return request(server)
        .post('/users')
        .send(duplicateUserData)
        .expect(HttpStatus.CONFLICT);
    });


    it(`should return ${HttpStatus.BAD_REQUEST} if password doesn't match confirmPassword`, () => {
      const duplicateUserData: CreateUserDto = {
        email: 'testPasswordMatch@mail.com',
        firstName: 'testPasswordMatch',
        lastName: 'testPasswordMatch',
        password: 'testPasswordMatch',
        confirmPassword: 'doesntmatch',
      };

      return request(server)
        .post('/users')
        .send(duplicateUserData)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });


  describe('GET /users', () => {

    beforeEach(async () => {
      const createAccessTokenDto = {
        email: usersFixture[0].email,
        password: usersFixture[0].password,
      };
      accessToken = await authService.createAccessToken(createAccessTokenDto);
    });


    it(`should return ${HttpStatus.UNAUTHORIZED} if the authorization Header is wrong `, () => {
      return request(server)
        .get('/users')
        .set('authorization', `Bearer wrongToken`)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it(`should return ${HttpStatus.UNAUTHORIZED} if the authorization Header is missing`, () => {
      return request(server)
        .get('/users')
        .expect(HttpStatus.UNAUTHORIZED);
    });


    it('should return all users', () => {
      return request(server)
        .get('/users')
        .set('authorization', `Bearer ${accessToken.accessToken}`)
        .expect(200)
        .then(({body}) => {
          expect(body).toBeInstanceOf(Array);
          expect(body.length).toBe(usersFixture.length);
        });
    });


    it('return should not include the password field', () => {
      return request(server)
        .get('/users')
        .set('authorization', `Bearer ${accessToken.accessToken}`)
        .expect(200)
        .then(({body}) => {
          const entity = body[0];
          expect(entity).not.toHaveProperty('password');
        });
    })
  });

});
