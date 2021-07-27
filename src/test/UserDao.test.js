const db = require('../infra/sqlite-db')
const UserDao = require('../dao/UserDao')
const User = require('../models/user-model')

describe('Testando operaçoes DAO users', () =>{
    
  it('Criando Usuário', async () => {
    const userBanco = new UserDao(db);
    let response = await userBanco.insertUser(new User('Vanessa','email@teste.com','*******'))
      expect(response).toBeTruthy()
  })

  it('Obtendo Usuários', async () => {
    const userBanco = new UserDao(db);
    let response = await userBanco.getAllUsers()
      expect(Array.isArray(response)).toBeTruthy()
  })

  it('Deletando Usuários', async () => {
    const userBanco = new UserDAO(db);
    let response = await userBanco.deleteUser(110)
      expect(response).toBe()
  })
})