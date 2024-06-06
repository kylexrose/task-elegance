import "./App.css"
import { useContext, useEffect, useState } from 'react';
import LeftNav from './components/LeftNav/LeftNav'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Project from './components/Project'
import Popup from './components/common/popup/popup'
import {useTaskMasterContext} from './context/taskMasterContext'

function App () {
  const {taskMaster, showPopup, drawerWidth, currentProjectIndex} = useTaskMasterContext()
  
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
    
    return (
        <Box sx={{ display: 'flex', height: '100%'}}>
          <CssBaseline />
          {showPopup && <Popup/>}
          <LeftNav/>
          {
            isLoaded && (
            <Project/>
          )}
        </Box>
    )
}

export default App

