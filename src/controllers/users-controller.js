const User = require('../models/user-model');
const UserDao = require('../dao/UserDao');

module.exports = (app, db) => {
  let userBanco = new UserDao(db)
  
  app.get('/users', (req, res) => {
    userBanco
    .getAllUsers()
    .then((rows) => {
      res.json({
        result: rows,
        count: rows.length,
    });
  })
    .catch((err) => {
      res.json({err});
    });
  });

  app.get('/users/:email', (req, res) => {
    userBanco.getEmailUser(req.params.email)
    .then(rows => {
        res.json({
          result: rows,
          count: rows.length
      })
    })
    .catch(err => {
      res.json({err})
    })
})

  app.post('/users', (req, res) => {
    const { nome, email, senha } = req.body;
    let newUser = new User(nome, email, senha);
    userBanco
      .insertUser(newUser)
      .then(() => {
        res.status(201).json({
          message: "Usuário inserido com sucesso",
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Erro ao inserir usuário",
          error: true,
      });
    });
  });

  app.delete('/users/:email', (req, res) => {
    userBanco.deleteUser(req.params.email)
    .then(() => {
      res.status(200).json({
        message: `Usuário com email: ${req.params.email}, foi deletado com sucesso.`,
        error: false
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: `Erro ao deletar usuário de e-mail: ${req.params.email}.`,
        error: true
      })
    })
  })


  app.put('/users/:email', (req, res) => {
    const { nome, email, senha } = req.body;
    var varCount = 0;
    if (nome || email || senha) {
      db.users.forEach((element) => {
        if (element.email === req.params.email) {
          if (nome) {
            element["nome"] = nome;
          }
          if (email) {
            element["email"] = email;
          }
          if (senha) {
            element["senha"] = senha;
          }
          varCount++;
        }
      });
      if (!varCount) {
        res.json({
          message: `Não existe usuário com este e-mail: ${req.params.email}`,
          error: true,
        });
      } else {
        res.json({
          message: `Usuário com e-mail: ${req.params.email}, foi atualizado com sucesso.`,
          error: false,
          count: varCount,
        });
      }
    } else {
      res.json({
        message: "Não foi possível atualizar o usuário, verifique se o campo informado é valido.",
        error: true,
      });
    }
  });
};