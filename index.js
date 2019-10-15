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

server.post('/projects',(req,res) =>{
  const project = {
    "id" : req.body.id,
    "title" : req.body.title,
    "tasks" : []
  }
  projects.push(project)
})

server.put('/projects/:id',(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const project = projects.find(project => project.id ===id)

  project.title = title
  return res.json({"message" : "sucess"})
})

server.put('/projects/:id/tasks',(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const project = projects.find(project => project.id ===id)
  project.tasks.push(title)
  return res.json(projects)
})

server.delete('/projects/:id', (req,res) =>{
  const {id} = req.params
  projectIndex = projects.find(project => project.id === id)
  projects.splice(projectIndex,1)
  return res.json(projects)
})