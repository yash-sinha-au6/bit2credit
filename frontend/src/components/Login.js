import React,{useState, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Navbar from './navbar'
function Login() {
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm(); 
    const [myLoading, setmyLoading] = useState(false);

    const onSubmit = (data) => {
       setmyLoading(true)
     
            axios.post("http://localhost:7000/api/v1/session", data)
            .then(res => {
               
                if(res.status === 201){
                    setmyLoading(false)
                    alert('Email or password is Invalid!')
                }else if(res.status === 200){
                   
                    localStorage.setItem("user", JSON.stringify(res.data));
                    var decoded = jwt_decode(res.data);
                    localStorage.setItem("myUserId", decoded.id);
                    setmyLoading(false);
                  
                    history.push("/home");
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
       <Container fluid style={{backgroundColor:"yellow"}}>
           <Navbar />
           <Row>
               <Col></Col>
               <Col md='auto'><h2>Please Login</h2></Col>
               <Col></Col>
           </Row>
           {myLoading ?
           <div>
                <Row style={{marginTop:'50px'}}>
                    <Col xs={5}></Col>
                    <Col xs={2}>
                    </Col>
                    <Col xs={5}></Col>
                </Row>   
            </div> 
           :
           <div>
               <Row style={{marginTop:'17px'}}>
               <Col></Col>
               <Col>
               <Form  onSubmit={handleSubmit(onSubmit)}>
                   <Form.Row>
                   <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" 
                    ref={register({required:true})}/>
                  
                </Form.Group>
                
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" 
                     ref={register({required:true})}/>
                </Form.Group>
               
                   </Form.Row>
                   {errors.email && <h6 style={{color:'red'}}>please enter Email!</h6>}
                   {errors.password && <h6 style={{color:'red'}}>please enter password!</h6>}
                <Button size="lg" block variant="primary" type="submit">
                    Login
                </Button>
                &nbsp;&nbsp;
                </Form>
               </Col>
               <Col></Col>
           </Row>
           </div>
           }
       </Container>
    )
}

export default Login
