
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PostAddOutlined from '@mui/icons-material/PostAddOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import {useTaskMasterContext} from '../../context/taskMasterContext'

function LeftNav({drawerWidth}) {
  const {taskMaster, setShowPopup, setCurrentProjectIndex} = useTaskMasterContext()

  const switchFunc = (index) =>{
    switch(index){
      case 0: return <AssignmentLateOutlinedIcon/>
      case 1: return <InsertInvitationOutlinedIcon/>
      case 2: return <BrowseGalleryOutlinedIcon/>
    }
  }
  return (
    <Drawer
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        },
    }}
    variant="permanent"
    anchor="left"
    >
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          Task Elegance 
          <IconButton onClick={() => setShowPopup(true)}>
            <PostAddOutlined/>
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {['Today', 'This week', 'Further Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {
                    switchFunc(index)
                  }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {taskMaster.map((project, i) => (
            <ListItem key={`${project.projectName + i}`} disablePadding>
              <ListItemButton onClick={()=>setCurrentProjectIndex(i)}>
                <ListItemIcon>
                <ArticleOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={project.projectName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </Drawer>
  );
}

LeftNav.propTypes = {
  drawerWidth: PropTypes.number
}

export default LeftNav