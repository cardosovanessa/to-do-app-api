const express = require('express');
const app = express() 
const port = 3030 
app.get('/users', (req, res) => {
  res.send('Rota ativada com GET e recurso Usuario')
}) 
app.get('/tasks', (req, res) => {
  res.send('Rota ativada com GET e recurso Tarefas')
}) 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})