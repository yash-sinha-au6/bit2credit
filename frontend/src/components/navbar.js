import React,{Fragment} from 'react'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Navbarlayout=()=>{
return(
    <Fragment>
         <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home"><Link to='/'>
    login
    </Link></Navbar.Brand>
    <Nav className="mr-auto" style={{marginRight:"auto 40px"}}>
    <Link to="/signup">Signup</Link>

    </Nav>

  </Navbar>
  
  
    </Fragment>
)
}
export default Navbarlayout