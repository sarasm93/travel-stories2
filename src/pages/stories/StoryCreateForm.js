import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import defaultImage from "../../assets/upload.png";

import styles from "../../styles/StoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Assets";

function StoryCreateForm() {

  const [errors, setErrors] = useState({});


  const textFields = (
    <div className="text-center">
        <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Destination</Form.Label>
            <Form.Control
            type="text"
            name="destination"
            value={destination}
            onChange={handleChange}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
            type="textarea"
            rows={10}
            name="content"
            value={content}
            onChange={handleChange}
            />
        </Form.Group>
        
        <Button
            className={`${btnStyles.Button} ${btnStyles.Cancel}`}
            onClick={() => {}}
        >
            cancel
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit">
            create
        </Button>
    </div>
  );

  return (
    <Form>
        <Row>
            <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                <Container
                    className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                >
                    <Form.Group className="text-center">
                    
                        <Form.Label
                        className="d-flex justify-content-center"
                        htmlFor="image-upload"
                        >
                        <Asset
                            src={defaultImage}
                            message="Click the camera to upload an image"
                        />
                        </Form.Label>

                    </Form.Group>
                    <div className="d-none">{textFields}</div>
                </Container>
            </Col>
            <Col md={5} lg={4} className="d-md-block p-0 p-md-2">
                <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
        </Row>
    </Form>
);}

export default StoryCreateForm;