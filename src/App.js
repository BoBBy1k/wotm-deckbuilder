import React from 'react'
import './App.css';
import Profile from './Profile.js';
//Provider for context api
import { DebugModeContextProvider} from './contexts/debugModeContext.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
        <DebugModeContextProvider>
          <Profile />
        </DebugModeContextProvider>
      </div>
      </header>
    </div>
  );
}

export default App;
