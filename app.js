const express = require('express');
const cors = require('cors');

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
app.use(cors())

// usando rotas
usersRoute(app, bd)
tasksRoute(app, bd)

module.exports = app