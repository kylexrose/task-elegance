import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {TaskMasterContextProvider} from './context/taskMasterContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskMasterContextProvider>
      <App className='prevent-select' style={{height: '100%'}}/>
    </TaskMasterContextProvider>
  </React.StrictMode>,
)
