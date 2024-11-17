import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import AddTask from '../Components/AddTask'
import EditTask from '../Components/EditTask'
import { deleteTaskAPI, getTaskAPI } from '../SERVICES/allAPI'
import { addTaskResponseContext, editTaskResponseContext } from '../contextApi/ContextApi'

EditTask
const Home = () => {
const{addTaskResponse, setAddTaskResponse}=useContext(addTaskResponseContext)
const{editTaskResponse, seteditTaskResponse}=useContext(editTaskResponseContext)
  const [userTasks, setUserTasks] = useState([])


  useEffect(() => {
    getTaskApi()
  }, [addTaskResponse,editTaskResponse])

  const getTaskApi = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      // apicall
      try {
        const result = await getTaskAPI(reqHeader)
        console.log(result);
        if (result.status == 200) {
          setUserTasks(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

  }
  // console.log(userTasks);

  const deleteTask =async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      // console.log(id);
      
      try {
      await deleteTaskAPI(id,reqHeader)
      getTaskApi()
      } catch (error) {
        console.log(error);  
      }
    } else {
      alert("Unauthorised user... Please Login!!!")
    }
  }


 
  



  return (
    <div>
      <Header />
      <div style={{ paddingTop: "50px" }}>
        <AddTask />
        <div className='container'>
          <div className='row mt-5 justify-content-evenly'>
            {userTasks?.length > 0 ?
              userTasks?.map(tasks => (
                <div key={tasks?._id} className='col-lg-3 col-md-4 col-sm-12 border d-flex justify-content-between text-center flex-column align-items-center py-3 shadow mb-3'>
                  <h5>{tasks?.task}</h5>
                  <p>{tasks?.description}<br />
                    <span className='fw-bold'>{tasks?.startDate} - {tasks?.endDate}</span></p>
                  <p className='fw-bold text-warning'>{tasks?.progress}</p>
                  <div>
                    <EditTask tasks={tasks}/>
                    <button onClick={()=>deleteTask(tasks?._id)} style={{ border: "solid" }} className='rounded-circle px-1 py-1 me-2 bg-light text-danger'><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              ))
              :
              <div className='fw-bold text-info text-center mt-5'>You haven't added any tasks yet...</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home