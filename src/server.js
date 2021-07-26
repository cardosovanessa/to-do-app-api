const app = require('./app')
const port = 3000

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando na porta: ' + process.env.PORT)
})

// app.listen(process.env.PORT, () => {
//   console.log('Servidor rodando na porta: ' + port)
// })