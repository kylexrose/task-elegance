import ProjectHeader from './ProjectHeader/ProjectHeader'
import ProjectMain from './ProjectMain/ProjectMain'
import  './Project.css'
import { Container } from '@mui/material'
import { useState } from 'react'
import {useTaskMasterContext} from '../../context/taskMasterContext'


function Project() {
  const [selected, setSelected ] = useState(null)
  const {taskMaster, currentProjectIndex, drawerWidth} = useTaskMasterContext()
  let project = typeof currentProjectIndex === 'number' ? taskMaster[currentProjectIndex] : null
  return (
    <Container sx={{height: '95vh'}}>
      <ProjectHeader key={project.projectName}/>
      <ProjectMain />
    </Container>
  )
}

export default Project