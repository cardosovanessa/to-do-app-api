const db = require('../infra/sqlite-db')
const UserDao = require('../DAO/UserDao')
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
})