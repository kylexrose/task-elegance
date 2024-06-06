import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import EventIcon from '@mui/icons-material/Event';
import { Container, IconButton, TextField } from '@mui/material';
import {useTaskMasterContext} from '../../../context/taskMasterContext'
import { useState } from 'react';

function ProjectFooter() {
  const {currentProjectIndex, addSection} = useTaskMasterContext()

  

  return (
    <Container sx={{display:'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', height: '100%'}}>
        <IconButton>
            <AddIcon fontSize='large'/>
        </IconButton>
        <IconButton>
            <LibraryAddIcon fontSize='large'/>
        </IconButton>
        <IconButton>
            <EventIcon fontSize='large'/>
        </IconButton>
    </Container>
  )
}

export default ProjectFooter