import request from 'supertest';
import app from '../app';
import bcrypt from 'bcrypt';
import User from '../models/user.model';


let token = '';

describe('POST /tasks', () => {
  beforeAll(async () => {
    const password = await bcrypt.hash('password123', 10);
    await User.create({
      username: 'testusertask',
      email: 'testusertask@example.com',
      password: password,
    });

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testusertask',
        password: 'password123',
      });
    token = response.body.token;
  });

  it('deve criar uma tarefa com sucesso', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nova Tarefa',
        description: 'Descrição da tarefa',
        dueDate: '2025-01-01',
        status: 'pending',
        userId: 1
      });

    expect(response.status).toBe(201);  
  });

  it('deve retornar erro ao criar uma tarefa com dados inválidos', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '',
        description: 'Tarefa com erro',
        dueDate: '1',
        status: 'pending',
        userId: 1
      });

    expect(response.status).toBe(400);
  });

  it('deve retornar erro ao criar uma tarefa sem autenticação', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Nova Tarefa',
        description: 'Descrição da tarefa',
        dueDate: '2025-01-01',
        status: 'pending',
        userId: 1
      });

    expect(response.status).toBe(401);
  });
});

describe('GET /tasks', () => {
  it('deve retornar todas as tarefas com sucesso', async () => {
    const response = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

describe('GET /tasks/:id', () => {
  it('deve retornar uma tarefa com sucesso', async () => {
    const response = await request(app)
      .get('/tasks/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});




describe('PUT /tasks/:id', () => {
  it('deve atualizar uma tarefa com sucesso', async () => {
    const response = await request(app)
      .put('/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tarefa Atualizada',
        description: 'Descrição atualizada',
        dueDate: '2025-01-01',
        status: 'completed',
        userId: 1
      });

    expect(response.status).toBe(200);
  });
});


describe('POST /tasks/:id/complete', () => {
  it('deve completar uma tarefa com sucesso', async () => {
    const response = await request(app)
      .post('/tasks/1/complete')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});


describe('POST /tasks/:id/attach-user', () => {

  it('deve associar um usuário a uma tarefa com sucesso', async () => {
    let userId: number;


    const userResponse = await request(app)
      .post('/auth/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      });
    console.log(JSON.stringify(userResponse.body, null, 2),'userResponse');
    userId = userResponse.body.id;
    const response = await request(app)
      .post('/tasks/1/attach-user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: userId
      });

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(userId);
  });
});



describe('DELETE /tasks/:id', () => {
  it('deve deletar uma tarefa com sucesso', async () => {
    const response = await request(app)
      .delete('/tasks/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});










