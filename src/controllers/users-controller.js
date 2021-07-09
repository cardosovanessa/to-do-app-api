module.exports = app => {
  app.get('/users', (req, res) => {
    res.send('Rota ativada com GET e recurso users')
  })

  app.post('/users', (req, res) => {
    res.send('Rota POST de usuário ativada: users adicionado ao banco de dados.')
    console.log(req.body)
  })
}