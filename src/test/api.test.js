const request = require('supertest');
const app = require('../app')

describe('testando rotas de usuários', () => {
  it('POST/users right', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        nome: 'Vanessa',
        email: 'test@test.com',
        senha: '******'
      })
    expect(response.body.error).toBe(false)
  })

  it('GET/users', async () => {
    const response = await request(app)
    .get ('/users')
    expect(response.body).toHaveProperty('result')
  })
})

describe('Testando rotas de tarefas', () => {
  it('POST: /tasks', async () => {
      const response = await request(app)

      .post('/tasks')
      .send({
          titulo: 'class',
          descricao: 'piano class',
          status: 'to do'
      })
      expect(response.body.error).toBe(false)
  })

  it('GET: /tasks', async () => {
    const response = await request(app)
      
    .get('/tasks')
    expect(response.body).toHaveProperty('result')
  })
})