import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/DestinationCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";


function DestinationCreateForm() {

    const [errors, setErrors] = useState({});

    const [destinationData, setDestinationData] = useState({
        destination: "",
        activities: "",
        priority: "",
        }
    );
    const { destination, activities, priority } = destinationData;

    const history = useHistory();

    const handleChange = (event) => {
        setDestinationData({
            ...destinationData,
            [event.target.name]: event.target.value,
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("destination", destination);
        formData.append("activities", activities);
        formData.append("priority", priority);

        try {
            await axiosReq.post("/destinations/", formData);
            history.push("/bucketlist"); /* IS THIS CORRECT? WANT TO GET TO USERS DESTINATIONS WHEN DESTINATION IS POSTED*/
            } catch (err) {
                console.log(err);
            if (err.response?.status !== 401) {
              setErrors(err.response?.data);
            }
        };
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>Destination:</Form.Label>
                <Form.Control
                    type="text"
                    name="destination"
                    value={destination}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.destination?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Activities:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={15}
                    name="activities"
                    value={activities}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.activities?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
        </>
    );

    const selectFields = (
        <>
            <Form.Group>
                <Form.Label>Priority:</Form.Label>
                <Form.Control 
                    as="select"
                    name ="priority"
                    value={priority}
                    onChange={handleChange}
                    >
                    <option value={1}>Now</option>
                    <option value={2}>Soon</option>
                    <option value={3}>Within 3 years</option>
                    <option value={4}>Within 5 years</option>
                    <option value={5}>Might happen</option>
                </Form.Control>
            </Form.Group>
            {errors?.priority?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
        </>
    )

    const buttons = (
        <>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Cancel} my-5`}
                onClick={() => history.goBack()}>
                Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Bright} my-5`} type="submit">
                Add
            </Button>
        </>
    )

    return (
        <>
            <div className="my-2">
                <p>All created destinations are added to your bucket list and sorted based on the selected priority.</p>
            </div> 
            <Form onSubmit={handleSubmit}>
                <Row className={`${appStyles.Content} ${styles.Container}`}>
                    <Col md={6}>
                        <Container>
                            {textFields}
                        </Container>
                    </Col>
                    <Col md={6}>
                        <Container>
                            <Col className="pl-0" sm={6} md={8} lg={6}>
                                {selectFields}
                            </Col>
                            <div className="d-flex flex-column my-5">
                                <div className="d-flex justify-content-end">
                                    {buttons}
                                </div>
                            </div>       
                        </Container>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default DestinationCreateForm;