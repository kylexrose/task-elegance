
import {FormControlLabel, Checkbox} from "@mui/material"
import PropTypes from 'prop-types'

function Task({task}) {
  return (
    <FormControlLabel
        label={task.taskName}
        control={
        <Checkbox
            checked={task.isDone}
        />
        }
    />
  )
}

Task.propTypes = {
  task : PropTypes.object
}

export default Task