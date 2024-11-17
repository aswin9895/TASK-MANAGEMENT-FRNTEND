import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()
const [userDetails,setUserDetails]=useState([])
useEffect(()=>{
     setUserDetails(JSON.parse(sessionStorage.getItem("user")))    
},[])
console.log(userDetails);


    const logout=()=>{
        sessionStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <div className='d-flex  justify-content-between align-items-center bg-info px-5 py-2'>
                <div>
                    <Link style={{ textDecoration: "none" }} to={'/home'}><h5 className='text-light'>TASK MANAGEMENT APP</h5></Link>
                </div>
                <div className='d-flex align-items-center'>
                    <h5 className='fw-bold'>{userDetails?.name} </h5>
                    <Dropdown>
                        <Dropdown.Toggle style={{ border: "none" }} size='sm' className='border fw-bolder bg-transparent' variant="" id="dropdown-basic">
                            <i class="fa-regular fa-user"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ border: "none", backgroundColor: "transparent", textAlign: "right" }}>
                            <button onClick={logout} className='w-50 px-2 py-1 bg-transparent fw-bold'>Logout</button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default Header