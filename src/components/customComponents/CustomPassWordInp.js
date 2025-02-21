import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CustomPassWordInp = ({placeholder,onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Form.Group className="d-flex" style={{justifyContent: 'flex-end',alignItems: 'center'}} controlId="formPasswordSignUp">
            <Form.Control
                type={showPassword ? 'text' : 'password'} 
                placeholder={placeholder}
                onChange={onChange}
            />
            <span 
                className="password-toggle-icon" 
                onClick={togglePasswordVisibility} 
                style={{ cursor: 'pointer', paddingRight: '15px'}} 
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </span>
        </Form.Group>
    );
};

export default CustomPassWordInp;
