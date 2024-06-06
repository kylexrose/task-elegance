import PropTypes from 'prop-types'
import { 
    createContext,
    useContext, 
    useEffect, 
    useReducer, 
    useState} from "react"
import {v4 as uuidv4} from 'uuid'

//EXAMPLE TASKMASTER
// {
//     projectName: "daily",
//     projectNotes: "This is what I need to accomplish today",
//     tasks: ['clean around desk', 'meditate'],
//     isDone: false,
//     sections: [{
//       sectionName: "Morning",
//       sectionTasks: [{
//         taskName: "check email",
//         taskDeadline: Date.now(),
//         isDone: false
//       },{
//         taskName: "teach class",
//         taskDeadline: Date.now(),
//         isDone: false
//       },{
//         taskName: "help students",
//         taskDeadline: Date.now(),
//         isDone: false
//       }]
//     }]
//   }

export const taskMasterContext = createContext()
export const useTaskMasterContext = () => useContext(taskMasterContext)

const reducer = (oldState, action) =>{
    switch(action.type){
        case "NEW_PROJECT":{
            if(!oldState.find(project => project.projectName === action.payload.projectName)){
                return [...oldState, {
                    projectName: action.payload.projectName,
                    projectNotes: action.payload.notes ? action.payload.notes : "",
                    tasks: [],
                    isDone: false,
                    sections: [] 
                }]
            }else{
                return oldState
            }
        }
        case "CHANGE_PROJECT_NAME":{//payload expects projectName
            const state = [...oldState]
            state[action.payload.masterIndex].projectName = action.payload.projectName
            return state
        }
        case "ADD_SECTION":{ //payload expects masterIndex, sectionName
            const state = [...oldState]
            state[action.payload.masterIndex].sections.push({
                sectionName: action.payload.sectionName,
                sectionTasks: []
            })
            return state
        }
        case "CHANGE_SECTION_NAME":{ //payload expects masterIndex, sectionIndex, sectionName
            const state = [...oldState]
            state[action.payload.masterIndex]
                .sections[action.payload.sectionIndex]
                .sectionName = action.payload.sectionName
            return state
        }
        case "ADD_SECTION_TASK":{ //payload expects masterIndex, sectionIndex, taskName
            const state = [...oldState]
            state[action.payload.masterIndex]
                .sections[action.payload.sectionIndex]
                .sectionTasks.push({
                    taskName: action.payload.taskName,
                    taskDeadline: null,
                    isDone: false})
            return state
        }
        case "EDIT_TASK": {//payload expects masterIndex, sectionIndex, taskIndex, deadline
            const state = [...oldState]
            const {masterIndex, sectionIndex, taskIndex,taskName, taskDeadline, isDone} = action.payload
            state[masterIndex].sections[sectionIndex].sectionTasks[taskIndex] = {
                    taskName,
                    taskDeadline,
                    isDone
                }
            return state
        }
    }
}

export const TaskMasterContextProvider = (props) => {
    const {children} = props
    const localStorageMemory = window.localStorage.getItem('taskMaster')

    const initialTaskMaster = localStorageMemory ? JSON.parse(localStorageMemory): []

    const [taskMaster, dispatch] = useReducer(reducer, initialTaskMaster)
    //misc. states in app
    const [showPopup, setShowPopup] = useState(false)
    const [drawerWidth, setDrawerWidth] = useState(200)
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

    useEffect(() => {
      window.localStorage.setItem('taskMaster', JSON.stringify(taskMaster))
    }, [taskMaster])

    const createNewProject = ({projectName, notes}) =>{
        dispatch({type: "NEW_PROJECT", payload: {projectName, notes: notes ? notes : ''}})
    }

    const changeProjectName = ({masterIndex, projectName}) =>{
        dispatch({type: "CHANGE_PROJECT_NAME", payload: {masterIndex, projectName}})
    }

    const addSection = ({masterIndex, sectionName}) =>{
        dispatch({type: 'ADD_SECTION', payload: {masterIndex, sectionName}}) 
    }

    const changeSectionName = ({masterIndex, sectionIndex, sectionName})=>{
        dispatch({type: "CHANGE_SECTION_NAME", payload: {masterIndex, sectionIndex, sectionName}})
    }

    const addSectionTask = ({masterIndex, sectionIndex, taskName})=>{
        dispatch({type: "ADD_SECTION_TASK", payload: {masterIndex, sectionIndex, taskName}})
    }
    
    const editTask = ({masterIndex, sectionIndex, taskIndex, deadline})=>{
        dispatch({type: "EDIT_TASK", payload: {masterIndex, sectionIndex, taskIndex, deadline}})
    }

    return (
        <taskMasterContext.Provider
        value={{
            taskMaster,
            createNewProject,
            changeProjectName,
            addSection,
            changeSectionName,
            addSectionTask,
            editTask,
            setShowPopup,
            showPopup,
            currentProjectIndex,
            setCurrentProjectIndex,
            drawerWidth}}>
            {children}
        </taskMasterContext.Provider>
    )
}

TaskMasterContextProvider.propTypes = {
    children: PropTypes.object
}