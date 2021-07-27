class TaskDao {
  constructor(db) {
    this.db = db;
  }
  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.db.all('select * from TAREFAS', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  getTitleTask(titulo){
    return new Promise((resolve, reject) => {
      this.db.all(`select * from TAREFAS where titulo = ?`, titulo, (err, rows) => {
        if(err){
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
  
  insertTask(task) {
    return new Promise((resolve, reject) => {
      this.db.run(`insert into TAREFAS (titulo, descricao, status, dataCriacao, id_usuario) values(?, ?, ?, ?, ?)`, Object.values(task), err => {
        if(err){
          reject(err);
        } else {
          resolve(true);
        }
      })
    })
  }

  deleteTask(titulo){
    return new Promise((resolve, reject) => {
      this.db.run(`delete from TAREFAS where titulo = ?`, titulo, err => {
        if(err){
          reject(err);
        } else {
          resolve(true);
        }
      })
    })
  }

  updateTask(id, titulo, descricao, status) {
    if (titulo || descricao || status) {
      let virgula = false
      let newArray = []
      let sql = 'update TAREFAS set'
      if(titulo) {
        sql = sql + ' titulo = ?'
        virgula = true
        newArray.push(titulo)
      }
      if(descricao) {
        if(virgula)
          sql = sql  +',descricao = ?'
        else {
          sql = sql  +'descricao = ?'
          virgula = true
        }
        newArray.push(descricao)
      }
      if(status){
        if(virgula)
          sql = sql  +',status = ?'
        else {
          sql = sql  +'status = ?'
          virgula = true
        }
        newArray.push(status)
      }
      sql = sql + 'WHERE id = ?'
      newArray.push(id)
      return new Promise((resolve, reject) => {
        this.db.run(sql, newArray, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
    else
    throw new Error('Nenhum atributo (id, titulo, descricao, status, datacriacao) enviado')
  }
}

module.exports = TaskDao