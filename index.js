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
function checkProjectExists(req,res,next){
  const {id} = req.params
  const project = projects.find(project => project.id ===id)
  if(!project){
    return res.status(400).json({error: 'Project does not exist'})
  }

  return next()
}

server.get('/projects',(req,res) =>{
  return res.json(projects)
})

server.post('/projects',checkProjectExists,(req,res) =>{
  const project = {
    "id" : req.body.id,
    "title" : req.body.title,
    "tasks" : []
  }
  projects.push(project)
  return res.json({"message" : "sucess"})
})


server.put('/projects/:id',checkProjectExists,(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const project = projects.find(project => project.id ===id)

  project.title = title
  return res.json({"message" : "sucess"})
})

server.put('/projects/:id/tasks',checkProjectExists,(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const project = projects.find(project => project.id ===id)
  project.tasks.push(title)
  return res.json({"message" : "sucess"})
})

server.delete('/projects/:id', checkProjectExists,(req,res) =>{
  const {id} = req.params
  projectIndex = projects.find(project => project.id === id)
  projects.splice(projectIndex,1)
  return res.json({"message" : "sucess"})
})