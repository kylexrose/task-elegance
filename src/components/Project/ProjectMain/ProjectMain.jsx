import { Box, Container, IconButton, TextField, Typography } from '@mui/material'
import SectionHeading from '../../common/SectionHeading/SectionHeading'
import '../Project.css'
import ProjectFooter from '../ProjectFooter/ProjectFooter'
import {useTaskMasterContext} from '../../../context/taskMasterContext'
import { useState } from 'react'

function ProjectMain() {
  const {drawerWidth, taskMaster, currentProjectIndex} = useTaskMasterContext()
  const project = taskMaster[currentProjectIndex]
  const [textInput, setTextInput] = useState('')

  const startNewHeading = () =>{
    return(
      <TextField variant='filled' placeholder='New Heading' value={textInput}/>
    )
  }
  return (
    <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column',flexGrow: 1, bgcolor: 'background.default', p: 5, mt: 7, height: '100%'}}
    >
        <Typography paragraph sx={{ml:`${drawerWidth}px`}}>
          {project.projectNotes}
        </Typography>
        {
          project.sections && project.sections.map(section =>{
            return(
              <SectionHeading section = {section} key = {section.sectionName}/>
            )
          })
        }
        <ProjectFooter/>
    </Box>
  )
}


export default ProjectMain