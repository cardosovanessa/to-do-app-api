class UserDao {
  constructor(db) {
    this.db = db;
  }
  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.all("select * from USUARIOS", (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      });
    });
  }

  getUserById(id){
    return new Promise((resolve, reject) =>{
      this.bd.all("select * from USUARIOS where id = (?)", id, (error, rows) => {
        if(error){
          reject(error)
        }else{
          resolve(rows)
        }
      })
    })
  }

  insertUser(user) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO USUARIOS(nome,email,senha) VALUES (?,?,?)`,
        Object.values(user),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  deleteUser(id){
    return new Promise((resolve, reject) => {
      this.db.run(`delete from USUARIOS where id = ?`, id, err => {
        if(err){
          reject(err);
        }
        else{
          resolve(true);
        }
      })
    })
  }
}

module.exports = UserDao