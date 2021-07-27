const Task = require('../models/task-model')
const TaskDao = require("../dao/TaskDao")

module.exports = (app, db) => {
  let taskBanco = new TaskDao(db)

  app.get('/tasks', async (req, res) => {
    try {
      const rows = await taskBanco.getAllTasks();
      
      res.json({
        result: rows,
        count: rows.length
      })
    } catch (err) {
      res.json({err});
    }
  });

  app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      if (parseInt(id)) {
        let resposta = await taskBanco.getTask(id);
        if (resposta) 
        res.json( resposta );
        else {
          throw new Error("Nenhuma tarefa encontrado");
        }
      } else {
        throw new Error("É esperado um ID tipo INT, tente novamente");
      }
    } catch (err) {
      res.status(500).json({ 
        error: err.message 
      });
    }
  });

  app.post('/tasks', async (req, res) => {
    const { titulo, descricao, status, userId } = req.body;
    let newTask = new Task(titulo, descricao, status, userId)
    try {
      await taskBanco.insertTask(newTask);
      res.status(201).json({
        message: "Tarefa inserida com sucesso",
        error: false,
      });
    } catch (err) {
      res.status(500).json({
        message: "Erro ao inserir tarefa",
        serverLog: err.message,
        error: true
      });
    }
  });

  app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await taskBanco.deleteTask(id);
      res.status(200).json({
        message: "Tarefa deletada com sucesso",
        error: false,
      });
    } catch (err) {
      res.status(500).json({
        message: "Erro ao deletar tarefa",
        serverLog: err.message,
        error: true,
      });
    }
  });

  app.put("/tasks/:id", async (req, res) => {
    const {titulo, descricao, status} = req.body;
    const { id } = req.params;
    try {
      await taskBanco.updateTask(id, titulo, descricao, status);
      res.status(200).json({
        message: "Tarefa atualizada com sucesso",
        error: false,
      });
    } catch (err) {
      res.status(500).json({
        message: "Erro ao atualizar a tarefa",
        serverLog: err.message,
        error: true,
      });
    }
  });
};