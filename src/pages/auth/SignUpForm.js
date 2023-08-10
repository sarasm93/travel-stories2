import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignUpInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import axios from "axios";


const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/login");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };    
      
    return (
        <Row className={styles.Row}>
            <Col className="m-auto py-2 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                        <Form.Label className="d-none">Username:</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password:</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Enter password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Confirm the password:</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Repeat password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                        ))}
                        <div className="text-center">
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                                type="submit">
                                Sign up
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                            ))}
                        </div>
                    </Form>
                </Container>
                <Container className='mt-3'>
                    <Link className={styles.Link} to="/login">Already have an account? Sign in<span> here.</span></Link>
                </Container>
            </Col>
        </Row>
  );
};

export default SignUpForm;