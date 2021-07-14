const Tasks = require('../models/task-model')

module.exports = (app, db) => {
  app.get('/tasks', (req, res) => {
    res.json({
      result: db.tasks,
      count: db.tasks.length
    })
  })

  app.get('/tasks/:titulo', (req, res) => {
    let arrayResp = db.tasks.filter((element) => {
      return element.titulo === req.params.titulo
    })
    res.json({
      result: arrayResp,
      count: arrayResp.length
    })
  })

  app.delete('/tasks/:titulo', (req, res) => {
    let arrayCount = db.tasks.length
    db.tasks = db.tasks.filter((element) => {
      return element.titulo !== req.params.titulo
    })
    if (arrayCount === db.tasks.length) {
      res.json({
        message: `Não existe tarefa com esse título: ${req.params.titulo}`,
        error: true
      })
    } else {
      res.json({
        message: `Tarefa com título: ${req.params.titulo}, foi deletada com sucesso.`,
        error: false
      })
    }
  })

  app.post('/tasks', (req, res) => {
    const {
      titulo,
      data,
      status,
      descricao
    } = req.body
    let newTasks = new Tasks(titulo, data, status, descricao)
    db.tasks.push(newTasks)
    res.json({
      message: 'Tarefa criada com sucesso',
      error: false
    })
  })
}