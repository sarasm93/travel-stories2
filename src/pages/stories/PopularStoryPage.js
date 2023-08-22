import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import StoryPage from "../stories/StoryPage";
import { Col, Container, Row } from "react-bootstrap";
import Asset from "../../components/Asset";
import styles from "../../App.module.css";
  

const PopularStoryPage = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const [story, setStory] = useState({ results: [] });


  useEffect(() => {
    const fetchData = async () => {
        try {
            const [ { data: story } ] = await Promise.all([ axiosReq.get(`/stories/${id}/`)
            ]);
            setStory({ results: [story] });
            setHasLoaded(true);
        } catch (err) {
            console.log(err);
        }
    };

    fetchData();
    }, [id, setStory]);


  return (
    <Row className="h-100 pt-4">
        <Col className="p-0 m-auto" lg={8}>
            <Container>
                {hasLoaded ? (
                    <StoryPage storyId={id}/>
                ) : (
                    <Container className={styles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Container>
        </Col>
    </Row>
  )
}

export default PopularStoryPage