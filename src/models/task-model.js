var idTask = 0;

class Task {
  constructor(titulo, descricao, senha, dataCriacao) {
    this.id = idTask++;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.dataCriacao = dataCriacao;
  }
}

module.exports = Task