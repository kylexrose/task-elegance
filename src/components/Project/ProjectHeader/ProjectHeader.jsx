import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useTaskMasterContext} from '../../../context/taskMasterContext'

function ProjectHeader() {
  const {drawerWidth, currentProjectIndex, taskMaster} = useTaskMasterContext()
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {typeof currentProjectIndex === "number" && taskMaster[currentProjectIndex].projectName}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default ProjectHeader