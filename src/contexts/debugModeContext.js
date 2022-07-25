// This context handles debug mode which currently only switches the storage from local storage (default) to non persistent
import React, {createContext, useState} from 'react'

//Reminder to export the context
const debugModeContext = createContext(true)

const DebugModeContextProvider = (props) => {
  //The 'global' state that currently only toggles local storage for debugging
  const [debugMode, setDebugMode]=useState(false);

    return (
        // This provider is providing the state and setState function
        <debugModeContext.Provider value={[debugMode, setDebugMode]}>
            {props.children}
        </debugModeContext.Provider>
    );
};

export {debugModeContext, DebugModeContextProvider};