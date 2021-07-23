const Task = require('../models/task-model')

module.exports = (app, db) => {
  app.get('/tasks', (req, res) => {
    res.json({
      result: db.tasks,
      count: db.tasks.length
    })
  })

  /*
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
  }) */

  app.post('/tasks', (req, res) => {
    const {
      titulo,
      descricao,
      status,
      dataCriacao,
      userId
    } = req.body
    let newTasks = new Task(titulo, descricao, status, dataCriacao)
    db.tasks.push(newTasks)
    res.json({
      message: 'Tarefa criada com sucesso',
      error: false
    })
  })

  /*
  app.put('/tasks/:titulo', (req, res) => {
    const {
      titulo,
      descricao,
      status,
      dataCriacao
    } = req.body
    var varCount = 0;
    if (titulo || descricao || status || dataCriacao) {
      db.tasks.forEach((element) => {
        if (element.titulo === req.params.titulo) {
          if (titulo) {
            element["titulo"] = titulo;
          }
          if (descricao) {
            element["descricao"] = descricao;
          }
          if (status) {
            element["status"] = status;
          }
          if (dataCriacao) {
            element["dataCriacao"] = dataCriacao;
          }
          varCount++
        }
      })
      if (!varCount) {
        res.json({
          message: `Não existe tarefa com esse título: ${req.params.titulo}`,
          error: true
        })
      } else {
        res.json({
          message: `Tarefa com título: ${req.params.titulo}, foi atualizada com sucesso.`,
          error: true,
          count: varCount
        })
      }
    } else {
      res.json({
        message: "Não foi possível atualizar a tarefa, verifique se campo passado é valido.",
        error: true
      })
    }
  }) */
};
