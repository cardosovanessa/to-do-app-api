Skip to content
luizzzabiassi
/
to-do-app-api
Atividade no Resilia: Criação de API com rotas para um aplicativo de tarefas.

 2 stars  0 forks
Code
Issues
Pull requests
Actions
Projects
More
to-do-app-api/src/controllers/tarefa-controller.js /
@luizzzabiassi
luizzzabiassi rotas put
 History
 1 contributor
92 lines (87 sloc)  2.84 KB
const Task = require("../models/tarefa-model")

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
        if(arrayCount === db.tasks.length){
            res.json({
                message: `Não existe tarefa com esse título: ${req.params.titulo}`,
                error: true
            })
        }
        else{
            res.json({
                message: `Tarefa com título: ${req.params.titulo}, foi deletada com sucesso.`,
                error: false
            })
        }
    })

    app.post('/tasks', (req, res) => {
        const {titulo, descricao, status, data_criacao} = req.body
        let newTask = new Task(titulo, descricao, status, data_criacao)
        db.tasks.push(newTask)
        res.json({
            message: 'Tarefa criada com sucesso.',
            error: false
        })
    })

    app.put('/tasks/:titulo', (req, res) => {
        const {titulo, descricao, status, data_criacao} = req.body;
        var varCount = 0;
        if(titulo || descricao || status || data_criacao){
            db.tasks.forEach((element) => {
                if(element.titulo === req.params.titulo){
                    if(titulo){
                        element["titulo"] = titulo;
                    }
                    if(descricao){
                        element["descricao"] = descricao;
                    }
                    if(status){
                        element["status"] = status;
                    }
                    if(data_criacao){
                        element["data_criacao"] = data_criacao;
                    }
                    varCount++
                }
            })
            if(!varCount){
                res.json({
                    message: `Não existe tarefa com esse título: ${req.params.titulo}`,
                    error: true
                })
            }
            else{
                res.json({
                    message: `Tarefa com título: ${req.params.titulo}, foi atualizada com sucesso.`,
                    error: true,
                    count: varCount
                })
            }
        }
        else{
            res.json({
                message: "Não foi possível atualizar a tarefa, verifique se campo passado é valido.",
                error: true
            })
        }
    })
}
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete