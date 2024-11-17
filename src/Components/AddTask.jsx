import React, { useContext, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { addTaskAPI } from '../SERVICES/allAPI';
import { addTaskResponseContext } from '../contextApi/ContextApi';

const AddTask = () => {
  const { addTaskResponse, setAddTaskResponse } = useContext(addTaskResponseContext)
  const [taskDetails, setTaskDetails] = useState({
    task: "", description: "", startDate: "", endDate: "", progress: ""
  })
  // console.log(taskDetails);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setTaskDetails({
      task: "", description: "", startDate: "", endDate: "", progress: ""
    })
    setShow(false);
  }
  const handleShow = () => setShow(true);

  // handleAddTask
  const handleAddTask = async (e) => {
    e.preventDefault();
    const { task, description, startDate, endDate, progress } = taskDetails
    if (task && description && startDate && endDate && progress) {
      const reqBody = new FormData()
      reqBody.append('task', task)
      reqBody.append('description', description)
      reqBody.append('startDate', startDate)
      reqBody.append('endDate', endDate)
      reqBody.append('progress', progress)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        // make api call 
        try {
          const result = await addTaskAPI(reqBody, reqHeader)
          if (result.status == 200) {
            alert("Task added successfully!!!")
            setAddTaskResponse(result.data)
            handleClose()
          } else {
            if (result.status == 406) {
              alert(result.response.data)
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Please fill the details completely!!!")
    }
  }

  return (
    <div className='container'>
      <h1>Add Task <button onClick={handleShow} className='rounded-circle px-2 py-1 bg-info text-light'><i class="fa-solid fa-plus"></i></button></h1>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>ADD TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="heading">
              <Form.Control onChange={(e) => setTaskDetails({ ...taskDetails, task: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Task" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="des">
              <Form.Control onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Description" />
            </Form.Group>
          </Form>
          <FloatingLabel controlId="sdate" label="Start date">
            <Form.Control onChange={(e) => setTaskDetails({ ...taskDetails, startDate: e.target.value })} style={{ color: "black", paddingTop: "29px", borderRadius: "10px" }} className='fw-normal bg-light' type="date" placeholder="Starting Date" />
          </FloatingLabel>
          <FloatingLabel className='mt-3' controlId="edate" label="End date">
            <Form.Control onChange={(e) => setTaskDetails({ ...taskDetails, endDate: e.target.value })} style={{ color: "black", paddingTop: "29px", borderRadius: "10px" }} className='fw-normal bg-light' type="date" placeholder="End Date" />
          </FloatingLabel>
          <select onChange={(e) => setTaskDetails({ ...taskDetails, progress: e.target.value })} style={{border:"none",backgroundColor:"lightgray"}} name="" id="" className='fw-bolder fs-4 px-2 py-2 mt-3 shadow'>
            <option selected disabled hidden value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="On-Going">On-Going</option>
            {/* <option value="Completed">Completed</option> */}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddTask} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddTask