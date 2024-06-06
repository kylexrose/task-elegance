import { ArrowDropDownOutlined } from '@mui/icons-material'
import { FormGroup, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import Task from '../Task/Task'
import PropTypes from 'prop-types'

function SectionHeading({section}) {
  return (
    <>
      <div style={{backgroundColor: "pink"}}>
        <Typography variant='h6' sx={{p:1}}>
          <b>{section.sectionName}</b>
        </Typography>
      </div>
      <FormGroup>
      {
      section.sectionTasks.map(task =>{
          return(
            <Task task = {task} key={task.taskName}/>
          )
        })
      }
      </FormGroup>
    </>
  )
}

SectionHeading.propTypes = {
  section: PropTypes.object,
}

export default SectionHeading