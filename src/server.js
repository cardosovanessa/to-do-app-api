const express = require('express');
const app = express()
const port = 3030

// import router
const usersRoute = require('./controllers/users-controller')
const tasksRoute = require('./controllers/tasks-controller');

// import models n DB
const User = require('./models/user-model')
const Task = require('./models/task-model')

const Db = require('./infra/bd')

// middlewares
app.use(express.json())

// usando rotas
usersRoute(app, User, Db)
tasksRoute(app, Task, Db)

console.log(new User('Vanessa', 'teste@teste.com', '12345'));
console.log(new User('Maria', 'maria@teste.com', '678910'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})