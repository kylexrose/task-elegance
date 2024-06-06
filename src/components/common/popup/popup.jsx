import { Box, Modal, TextField, Container, Button, Alert} from '@mui/material'
import { useState } from 'react';
import {useTaskMasterContext} from '../../../context/taskMasterContext'

function Popup() {
    const {taskMaster, createNewProject, setShowPopup} = useTaskMasterContext()
    const [nameInput, setNameInput] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')

    const resetForm = () =>{
        setError('')
        setNameInput('')
        setShowPopup(false)
    }
    
    const handleCreateProject = (event) =>{
        event.preventDefault()
        if(nameInput.length <= 0){
            return setError('Project name must have content')
        }
        if(taskMaster.find(project => project.projectName === nameInput)){
            return setError('Project name must be unique')
        }else{
            createNewProject({projectName: nameInput, notes})
            resetForm()
        }
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid gray',
        boxShadow: 24,
        p: 4,
      };

  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
>
  <Box sx={style}>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleCreateProject}>
            <TextField id="standard-basic" variant="standard" label="Project Name" value = {nameInput} onChange={(e)=> setNameInput(e.target.value)}/>
            <TextField id="standard-basic" label="Notes" sx={{height:'100px', width: '100%'}} variant="standard" value = {notes} onChange={(e)=> setNotes(e.target.value)}/>
            <Container>
                <Button variant="outlined" sx={{ml: 2}} onClick={resetForm}>Cancel</Button>
                <Button type='submit' variant="contained" sx={{ml: 2}}>Let&apos;s Begin</Button>
            </Container>
        </form>
    </Box>
  </Modal>
  )
}

export default Popup