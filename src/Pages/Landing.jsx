import React from 'react'
import { Link } from 'react-router-dom'
import mystyle from '../style.module.css'
const Landing = () => {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center bg-info px-5 py-3 shadow'>
                <div>
                    <Link to={'/'} style={{ textDecoration: "none" }}><h5 style={{ fontWeight: 900 }} className='text-light'>Task Management App</h5></Link>
                </div>
                <div className='d-flex align-items-center'>
                    <Link style={{ textDecoration: "none" }} to={'/login'}><h5 className='me-3'>Login</h5></Link>
                    <Link style={{ textDecoration: "none" }} to={'/register'}><h5>Register</h5></Link>
                </div>
            </div>

            <div style={{ backgroundColor: "lightblue", height: "95vh", display: "flex", justifyContent: "end", alignItems: "center" }} className={mystyle.landingbg}>
                <div className='w-50'>
                    <h1 className='fw-bold'>
                        TASK <span className='fw-bolder text-info'>MANAGEMENT</span> <br /> APP
                    </h1>
                    <p className='fw-bold  text-dark'>The users will be able to create and manage tasks. The App will give you remainders and helps to trackl your progress.</p>
                    <Link style={{ textDecoration: "none" }} to={'/login'}><button style={{ backgroundColor: "lightcyan", border: "solid", color: "blue", borderColor: "black" }} className='fw-bold px-2 py-1 rounded'>Get Started</button></Link>
                </div>
            </div>
        </>
    )
}

export default Landing