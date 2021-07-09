const express = require('express');
const app = express()
const port = 3030

const usersRoute = require('./controllers/users-controller')
const tasksRoute = require('./controllers/tasks-controller')

app.use(express.json())

usersRoute(app)
tasksRoute(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})