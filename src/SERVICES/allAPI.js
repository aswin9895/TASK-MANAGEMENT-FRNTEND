import commonAPi from "./commonAPI";
import SERVER_URL from "./SERVERURL";

// registerAPI
export const registerAPI = async (reqBody) => {
    return await commonAPi("POST", `${SERVER_URL}/register`, reqBody)
}

// loginAPI
export const loginAPI = async (reqBody) => {
    return await commonAPi("POST", `${SERVER_URL}/login`, reqBody)
}

// addTaskAPI
export const addTaskAPI = async (reqBody, reqHeader) => {
    return await commonAPi("POST", `${SERVER_URL}/addtask`, reqBody, reqHeader)
}

// getTaskAPI
export const getTaskAPI = async (reqHeader) => {
    return await commonAPi("GET", `${SERVER_URL}/gettask`, {}, reqHeader)
}

// editTaskAPI
export const editTaskAPI = async (id, reqBody, reqHeader) => {
    return await commonAPi("PUT", `${SERVER_URL}/task/${id}/edit`, reqBody, reqHeader)
}

// deleteTaskAPI
export const deleteTaskAPI = async (id, reqHeader) => {
    return await commonAPi("DELETE", `${SERVER_URL}/task/${id}/delete`, {}, reqHeader)
}