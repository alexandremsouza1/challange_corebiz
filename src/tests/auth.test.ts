import request from 'supertest';
import app from '../index';
import User from '../models/user.model';

describe('POST /auth/login', () => {
  it('deve autenticar o usuário e retornar um token', async () => {
    // Primeiro, cria um usuário na base de dados de testes
    await User.create({
      username: 'testuser',
      password: 'password123', // Aqui seria ideal usar bcrypt para senha criptografada
    });

    // Fazendo a requisição para a rota de login
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    // Verificando se o código de status é 200
    expect(response.status).toBe(200);

    // Verificando se o token JWT foi retornado
    expect(response.body.token).toBeDefined();
  });

  it('deve retornar erro com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'invaliduser',
        password: 'wrongpassword',
      });

    // Verificando se o código de status é 401
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Credenciais inválidas');
  });
});
