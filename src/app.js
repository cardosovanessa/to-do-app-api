const express = require('express');
const cors = require('cors');

// configs
const app = express()

// import router
const usersRoute = require('./controllers/users-controller')
const tasksRoute = require('./controllers/tasks-controller');

// import DB
const db = require('./infra/sqlite-db')

// middlewares
app.use(express.json())
app.use(cors())

usersRoute(app, db)
tasksRoute(app, db)

module.exports = app