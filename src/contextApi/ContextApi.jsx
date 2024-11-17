import React, { createContext, useState } from 'react'
export const addTaskResponseContext = createContext()
export const editTaskResponseContext = createContext()

const ContextApi = ({ children }) => {
    const [addTaskResponse, setAddTaskResponse] = useState("")
    const [editTaskResponse, seteditTaskResponse] = useState("")
    return (
        <editTaskResponseContext.Provider value={{ editTaskResponse, seteditTaskResponse }}>
            <addTaskResponseContext.Provider value={{ addTaskResponse, setAddTaskResponse }}>
                {children}
            </addTaskResponseContext.Provider>
        </editTaskResponseContext.Provider>
    )
}

export default ContextApi