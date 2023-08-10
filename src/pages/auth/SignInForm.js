import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import logo from "../../assets/big-logo.png";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignUpInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignInForm() {
    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = signInData;
  
    const [errors, setErrors] = useState({});
  
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            history.push("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };
  
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Row className={styles.Row}>
            <Col className="m-auto p-0 p-md-2" md={6}>
                <div className="text-center">
                    <Image roundedCircle src={logo} alt="logo" height="100" className={styles.Image} />
                </div>
                <Container className={`${appStyles.Content} p-4 `}>
                <h1 className={styles.Header}>Log In</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                className={styles.Input}
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                className={styles.Input}
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <div className="text-center">
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                                type="submit">
                                Log in
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-3">
                                    {message}
                                </Alert>
                            ))}
                        </div>
                    </Form>
                </Container>
                <Container className="mt-3">
                <Link className={styles.Link} to="/signup">
                    Don't have an account? <span>Sign up here!</span>
                </Link>
                </Container>
            </Col>
        </Row>
    );
}

export default SignInForm;