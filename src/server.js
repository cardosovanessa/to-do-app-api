const express = require('express');
// configs
const app = express()
const port = 3030

// import router
const usersRoute = require('./controllers/users-controller')
const tasksRoute = require('./controllers/tasks-controller');

// import models n DB
const User = require('./models/user-model')
const Task = require('./models/task-model')
const bd = require('./infra/sqlite-db')

// middlewares
app.use(express.json())

// usando rotas
usersRoute(app, bd)
tasksRoute(app, bd)

app.listen(port, () => {
  console.log('Servidor rodando na porta: ' + port)
})