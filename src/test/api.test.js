const request = require('supertest');
const app = require('../app')

describe('Testando rotas de usuários', () => {
  it('deve criar um usuário com sucesso', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        nome: 'Vanessa',
        email: 'test@test.com',
        senha: '******'
      })
    expect(response.body.error).toBe(false)
  })

  it('deve retornar a lista de usuários', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('result')
  })
})

  it('DELETE /users/someID ', async () =>{
    const response = await request(app)
    .get('/users/15')
    expect(response).toBeTruthy()
  })

describe('Testando rotas de tarefas', () => {
  it('deve criar uma tarefa com sucesso', async () => {
    const response = await request(app)
    .post('/tasks')
    .send({
      titulo: 'class',
      descricao: 'piano class',
      status: 'to do'
    })
    expect(response.body.error).toBe(false)
  })

  it('deve retornar a lista de tarefas com sucesso', async () => {
    const response = await request(app).get('/tasks')
    expect(response.body).toHaveProperty('result')
  })
})