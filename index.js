const express = require('express')

const server = express()

server.listen(3000)
server.use(express.json())


const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  },
  {
    id: "2",
    title: "Projeto sensacional",
    tasks: ["Reunião com equipe", "Planejar roadmap"]
  }
]

server.get('/projects',(req,res) =>{
  return res.json(projects)
})