import React, { useEffect, useState } from "react";

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
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function DestinationCreateForm({filter = "" }) {
    const [savedStories, setSavedStories] = useState({ results: [] });
    const [errors, setErrors] = useState({});

    const [destinationData, setDestinationData] = useState({
        destination: "",
        activities: "",
        priority: "",
        story_tag: [],
        }
    );
    const { destination, activities, priority, story_tag } = destinationData;

    const history = useHistory();

    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchSavedStories = async () => {
          try {
            const { data } = await axiosReq.get(`/stories/?${filter}/`);
            setSavedStories(data);
          } catch (err) {
            console.log(err);
          }
        };

        fetchSavedStories(); 
        }, [filter, currentUser]
    
    );

    const handleChange = (event) => {
        setDestinationData({
            ...destinationData, [event.target.name]: event.target.value,
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("destination", destination);
        formData.append("activities", activities);
        formData.append("priority", priority);
        formData.append("story_tag", story_tag);

        try {
            await axiosReq.post("/destinations/", formData);
            history.push("/bucketlist"); 
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

    const options = [
        {
            label: "Now",
            value: "1",
        },
        {
            label: "Soon",
            value: "2",
        },
        {
            label: "Within 3 years",
            value: "3",
        },
        {
            label: "Within 5 years",
            value: "4",
        },
        {
            label: "Might happen",
            value: "5",
        },
      ];

    const selectFields = (
        <>
            <Form.Group>
                <Form.Label>Priority:</Form.Label>
                <Form.Control 
                    as="select"
                    value={priority}
                    name="priority"
                    onChange={handleChange}
                    >
                        {options.map((option) => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))}
                </Form.Control>
            </Form.Group>
            {errors?.priority?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Story tag:</Form.Label>
                <Form.Control
                    as="select"
                    name ="story_tag"
                    defaultValue={"placeholder"}
                    onChange={handleChange}
                >
                    <option value={"placeholder"}>Select...</option>
                    {savedStories.results.length ? savedStories.results.map((savedStories) => {
                        return <option key={savedStories.id} value={savedStories.id}>{savedStories.title}</option>
                    })
                    : null }
                </Form.Control>
                {errors?.story_tag?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message="Please choose a story"}
                    </Alert>
                ))}
            </Form.Group>
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
            <div className="pt-5 pb-1">
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