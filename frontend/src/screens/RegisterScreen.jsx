import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import {setCredentials} from '../slices/authSlice'


export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector( (state) => state.auth );
  const [register, { isLoading }] = useRegisterMutation()


  useEffect( () => {

    if(userInfo) {

      navigate('/');

    }
  }, [ navigate, userInfo ] );


  const submitHandler = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-z\s'-]+$/

    if(!nameRegex.test(name)){
      toast.error('Name is not valid')
      return
    }
    if(name.length<=3){
      toast.error('Name is not valid')
      return
    }
    if(!emailRegex.test(email)){
      toast.error("Email Not Valid")
      return
    }
    if(password.length===0){
      toast.error('Password is Empty')
      return
    }
    if(password !== confPassword){
      toast.error('Password Do Not Matxh')
    }else{
      try {
      const responseFromApiCall = await register( { name,email, password } ).unwrap();
      dispatch( setCredentials( { ...responseFromApiCall } ) );
      navigate('/');

      } catch (err) {
        toast.error( err?.data?.message || err?.error );
      }
    }
   
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>


        {/* <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group> */}

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        { isLoading && <> <Loader/> </>}

        <Button type="submit" variant="primary" className="mt-3 bg-gray-800 hover:bg-gray-800">
            Signup
        </Button>

        <Row className="py-3">
        <Col>
            Already Have an account? <Link to='/login'>Log In</Link>
        </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};



