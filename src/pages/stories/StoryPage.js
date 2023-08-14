import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Story from "./Story";

function StoryPage() {
    const { id } = useParams();
    const [story, setStory] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: story }] = await Promise.all([
                axiosReq.get(`/stories/${id}`),
                ]);
                setStory({ results: [story] });
                console.log(story)
            } catch (err) {
                console.log(err);
            }
            };

        handleMount();
        }, [id]);

    return (
        <Row className="h-100">
            <Col lg={3} className="d-none d-lg-block p-0 p-lg-2">
            Popular stories for desktop
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={9}>
                <p>Popular stories for mobile</p>
                <Story {...story.results[0]} setStories={setStory} storyPage />
                <Container className={appStyles.Content}>
                Comments
                </Container>
            </Col>
        </Row>
    );
}

export default StoryPage;