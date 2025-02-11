import request from 'supertest';
import app from '../index';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

describe('POST /auth/login', () => {
  it('deve autenticar o usuário e retornar um token', async () => {
    const password = await bcrypt.hash('password123', 10);
    await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: password,
    });

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(response.status).toBe(200);

    expect(response.body.token).toBeDefined();
  });

  it('deve retornar erro com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'invaliduser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Credenciais inválidas');
  });
});
