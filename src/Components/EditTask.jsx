import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { editTaskAPI } from '../SERVICES/allAPI';
import { editTaskResponseContext } from '../contextApi/ContextApi';

const EditTask = ({ tasks }) => {
const{editTaskResponse, seteditTaskResponse}=useContext(editTaskResponseContext)
  const [editTask, setEditTask] = useState({
    id: tasks._id, task: tasks.task, description: tasks.description, startDate: tasks.startDate, endDate: tasks.endDate, progress: tasks.progress
  })
// console.log(editTask);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEditTask({
      id: tasks._id, task: tasks.task, description: tasks.description, startDate: tasks.startDate, endDate: tasks.endDate, progress: tasks.progress
    })
  }
  const handleShow = () => {
    setShow(true);
    setEditTask({
      id: tasks._id, task: tasks.task, description: tasks.description, startDate: tasks.startDate, endDate: tasks.endDate, progress: tasks.progress
    })
  }

  const edithandle = async () => {
    const { id, task, description, startDate, endDate, progress } = editTask
    if (task && description && startDate && endDate && progress) {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await editTaskAPI(id, editTask, reqHeader)
          if (result.status==200) {
            alert("Task updated successfully!!!")
            setEditTask(result.data)
            seteditTaskResponse(true)
          handleClose()
          }
        } catch (error) {
          console.log(error);

        }
      }else{
        alert("Unauthorised user... Please Login!!!")
      }
    } else {
      alert("Please fill the details completely!!!")
    }
  }



  return (
    <>
      <button onClick={handleShow} style={{ border: "solid" }} className='rounded-circle px-1 py-1 me-2 bg-light text-warning'><i class="fa-solid fa-pen-to-square"></i></button>

      <Modal show={show} onHide={handleClose} keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>EDIT TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="heading">
              <Form.Control value={editTask.task} onChange={(e) => setEditTask({ ...editTask, task: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Task" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="des">
              <Form.Control value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Description" />
            </Form.Group>
          </Form>
          <FloatingLabel controlId="sdate" label="Start date">
            <Form.Control value={editTask.startDate} onChange={(e) => setEditTask({ ...editTask, startDate: e.target.value })} style={{ color: "black", paddingTop: "29px", borderRadius: "10px" }} className='fw-normal bg-light' type="date" placeholder="Starting Date" />
          </FloatingLabel>
          <FloatingLabel className='mt-3' controlId="edate" label="End date">
            <Form.Control value={editTask.endDate} onChange={(e) => setEditTask({ ...editTask, endDate: e.target.value })} style={{ color: "black", paddingTop: "29px", borderRadius: "10px" }} className='fw-normal bg-light' type="date" placeholder="End Date" />
          </FloatingLabel>
          <select value={editTask.progress} onChange={(e) => setEditTask({ ...editTask, progress: e.target.value })} style={{ border: "none", backgroundColor: "lightgray" }} name="" id="" className='fw-bolder fs-4 px-2 py-2 mt-3 shadow'>
            <option selected disabled hidden value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="On-Going">On-Going</option>
            <option value="Completed">Completed</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={edithandle} variant="primary">EDIT</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditTask