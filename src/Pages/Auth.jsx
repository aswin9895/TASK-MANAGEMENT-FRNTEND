import React, { useContext, useEffect, useState } from 'react'
import mystyle from '../style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../SERVICES/allAPI'
import { tokenAuthContext } from '../contextApi/AuthContext'

const Auth = ({ insideRegister }) => {
const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const [userDetails, setUserDetails] = useState({
    name: "", email: "", phnno: "", password: ""
  })
  console.log(userDetails);

  const navigate = useNavigate()

  // handle signup
  const handleSignUp = async (e) => {
    e.preventDefault()
    if (userDetails.name && userDetails.email && userDetails.phnno && userDetails.password) {
      // api call 
      try {
        const result = await registerAPI(userDetails)
        // console.log(result);

        if (result.status == 200) {
          alert("Registration Successfull!!!")
          setUserDetails({
            name: "", email: "", phnno: "", password: ""
          })
          navigate('/login')
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setUserDetails({
              name: "", email: "", phnno: "", password: ""
            })
            navigate('/login')
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill The Form Completely!!!")
    }
  }

  // handlelogin
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userDetails
    if (email && password) {
      // api call
      try {
        const result = await loginAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.users))
          sessionStorage.setItem("token", result.data.token)
setIsAuthorised(true)
          navigate('/home')
        } else {
          if (result.status == 406) {
            alert(result.response.data)
          }
        }
      } catch (error) {
      }
    } else {
      alert("Please Fill The Form Completely!!!")
    }
  }




  return (
    <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100vh", padding: "5%" }} className={mystyle.bg}>
      <div style={{ paddingTop: "25px", paddingBottom: "25px", paddingLeft: "10%", paddingRight: "10%", borderRadius: "25px" }} className={mystyle.loginbgclr}>
        {insideRegister ?
          <h5 style={{ fontSize: "18px" }} className='text-light text-center mt-2 fs-3 fw-bold'>
            REGISTER</h5>
          :
          <h5 style={{ fontSize: "18px" }} className='text-light text-center mt-2 fs-3 fw-bold'>
            LOGIN</h5>}
        <Form>
          {insideRegister &&
            <Form.Group className="mb-3" controlId="Name">
              <Form.Control value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Name" />
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="Email">
            <Form.Control value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="email" placeholder="Email" />
          </Form.Group>
          {insideRegister &&
            <Form.Group className="mb-3" controlId="phn">
              <Form.Control value={userDetails.phnno} onChange={(e) => setUserDetails({ ...userDetails, phnno: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Phnone Number" />
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="password">
            <Form.Control value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        <div>
          {
            insideRegister ?
              <>
                <button onClick={handleSignUp} style={{ width: "100%", backgroundColor: "lightblue", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>SignUp</button>
                <p className='text-light mt-3 fw-bold'>Already A User? Please Click Here To  <Link style={{ textDecoration: "underline", color: "red" }} to={'/login'}> Login</Link></p>
              </>
              :
              <>
                <button onClick={handleLogin} style={{ width: "100%", backgroundColor: "lightblue", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>LogIn</button>
                <p className='text-light mt-3 fw-bold'>New User? Please Click Here To <Link style={{ textDecoration: "underline", color: "red" }} to={'/register'}> Register</Link></p>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Auth