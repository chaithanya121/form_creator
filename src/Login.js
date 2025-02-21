1
import React, { useState } from 'react';
import { Form, Button, InputGroup,Modal } from "react-bootstrap";
import { FaGooglePlusG, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import CustomMultiSelect from '@/components/customComponents/CustomMultiSelect';
import CustomDropdown from '@/components/customComponents/CustomDropdown';
import CustomPassWordInp from '@/components/customComponents/CustomPassWordInp';

const Login = ({ isModalOpen, closeModal }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [course, setCurse] = useState(['React Js','JavaScript','Angular Js','Vue Js','Python','Django','Figma','UI/UX','Data Science','DevOps'])
  const [selectedCourse, setselectedCourse] = useState([])

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };


  const types = [
    { name: 'Student', type: 'Student' },
    { name: 'Non-IT', type: 'Non-IT' },
    { name: 'Employee', type: 'Employee' },
];

const handleTypeChange = (selectedType) => {
    console.log("Selected Type:", selectedType);
};

  return (
    <Modal show={isModalOpen} onHide={closeModal}
    centered 
    className="custom-login-modal"
    >
      <Modal.Body style={{backgroundColor:'none', border:'none',width: '64em',right: '18em'}}>
        <div className="login-container" id="container">
          {/* Conditionally render based on isSignUp */}
          {isSignUp ? (
            <div className="form-container sign-up">
              <Form>
                <h1>Create Account</h1>
                <div className="social-icons mb-3">
                  <a href="#" className="icon me-2 login_icons">
                    <FaGooglePlusG size={24} />
                  </a>
                  <a href="#" className="icon me-2 login_icons">
                    <FaFacebookF size={24} />
                  </a>
                  <a href="#" className="icon me-2 login_icons">
                    <FaLinkedinIn size={24} />
                  </a>
                  <a href="#" className="icon login_icons">
                    <FaGithub size={24} />
                  </a>
                </div>
                <span>or use your email for registration</span>
                <Form.Group className="mb-3 w-8" controlId="formName">
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3 w-8" controlId="formEmailSignUp">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3 w-8" controlId="formCourses">
                  <CustomMultiSelect className={"login_multiselect"} onChange={(e)=>console.log(e)}  showSelectAll={true} selectedValues={selectedCourse} options={course} placeholder={"Select Course`s"} />
                  {/* <Form.Control type="password" placeholder="Password" /> */}
                </Form.Group>
                <Form.Group className="mb-3 w-8" controlId="formCourses">
                 <CustomDropdown 
                      className={"login_multiselect"}
                      options={types} 
                      onChange={handleTypeChange} 
                      placeholder="Select a Type"
                  />
                  </Form.Group>
                <Form.Group className="mb-3 w-8" controlId="formPasswordSignUp">
                    <CustomPassWordInp placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3 w-8" controlId="formConfPasswordSignUp">
                    <CustomPassWordInp placeholder="Conform Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </div>
          ) : (
            <div className="form-container sign-in">
              <Form>
                <h1>Sign In</h1>
                <div className="social-icons mb-3">
                  <a href="#" className="icon me-2 login_icons">
                    <FaGooglePlusG size={24} />
                  </a>
                  <a href="#" className="icon me-2 login_icons">
                    <FaFacebookF size={24} />
                  </a>
                  <a href="#" className="icon me-2 login_icons">
                    <FaLinkedinIn size={24} />
                  </a>
                  <a href="#" className="icon login_icons">
                    <FaGithub size={24} />
                  </a>
                </div>
                <span>or use your email and password</span>
                <Form.Group className="mb-3 w-8" controlId="formEmailSignIn">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3 w-8" controlId="formPasswordSignIn">
                  <CustomPassWordInp placeholder="Password" />
                </Form.Group>
                <a href="#">Forgot your email or password?</a>
                <Button variant="primary" type="submit" className="mt-3">
                  Sign In
                </Button>
              </Form>
            </div>
          )}

          {/* Toggle Container */}
          <div className="toggle-container">
            <div className="toggle">
              {isSignUp ? (
                <div className="toggle-panel toggle-left">
                  <h1>Welcome Back!</h1>
                  <p>Enter your personal details to use all of the site's features</p>
                  <Button variant="light" onClick={handleToggle} id="login">
                    Sign In
                  </Button>
                </div>
              ) : (
                <div className="toggle-panel toggle-right">
                  <h1>Hello, User!</h1>
                  <p>Register with your personal details to use all of the site's features</p>
                  <Button variant="light" onClick={handleToggle} id="register">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
