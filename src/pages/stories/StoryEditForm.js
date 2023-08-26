import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/StoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function StoryEditForm() {

    const [errors, setErrors] = useState({});

    const [storyData, setStoryData] = useState({
        title: "",
        destination: "",
        content: "",
        image: "",
    });

    const { title, destination, content, image } = storyData;

    const imageInput = useRef(null);
    const history = useHistory();

    const currentUser = useCurrentUser();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/stories/${id}/`);
                const { title, destination, content, image, is_owner } = data;
                is_owner ? 
                    setStoryData({ title, destination, content, image }) 
                : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setStoryData({
            ...storyData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setStoryData({
                ...storyData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("title", title);
        formData.append("destination", destination);
        formData.append("content", content);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }
    
        try {
            await axiosReq.put(`/stories/${id}/`, formData);
            history.push(`/profiles/${currentUser.profile_id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
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
                <Form.Label>Content:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    name="content"
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={5} lg={4} className="p-0 p-md-2 d-flex">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`
                        ${appStyles.Content} 
                        ${styles.Container} 
                        d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            <figure>
                                <Image 
                                    className={appStyles.Image} 
                                    src={image} 
                                    rounded 
                                />
                            </figure>
                            <div>
                                <Form.Label
                                    className={`
                                        ${btnStyles.Button} 
                                        ${btnStyles.Change} btn`}
                                    htmlFor="image-upload"
                                >
                                    Change image
                                </Form.Label>
                            </div>
                        <Form.File
                            id="image-upload"
                            accept="image/*"
                            onChange={handleChangeImage}
                            ref={imageInput}
                        />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-none">{textFields}</div>
                    </Container>
                    <Container>
                        <div className="text-center">
                            <Button
                                className={`
                                    ${btnStyles.Button} 
                                    ${btnStyles.Cancel} mb-4 mt-4`}
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </Button>
                            <Button 
                                className={`
                                    ${btnStyles.Button} 
                                    ${btnStyles.Bright} mb-4 mt-4`} 
                                type="submit"
                            >
                                Update
                            </Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default StoryEditForm;