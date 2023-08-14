import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../App.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Story from "./Story";
import Asset from "../../components/Asset";


function StoriesPage({filter = "" }) {
    const [stories, setStories] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchStories = async () => {
          try {
            const { data } = await axiosReq.get(`/stories/?${filter}search=${query}`);
            setStories(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
    
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchStories();
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
        }, [filter, query, pathname, currentUser]
    
      );
  
    return (
        <>
            <Row className="h-100">
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <p>Popular stories for desktop</p>
                </Col>
                <Col className="p-0" lg={8}>
                    <Container>
                        {hasLoaded ? (
                            <>
                                {stories.results.length ? (
                                    stories.results.map(story => (
                                        <Story key={story.id} {...story} setStories={setStories} />
                                        ))
                                ) : (
                                    console.log("use asset component to display not found message?")
                                )}
                            </>
                        ) : (
                            <Container className={styles.Content}>
                                <Asset spinner />
                            </Container>
                        )}
                    </Container>
                    <p>Popular stories for mobile</p>
                </Col>
            </Row>
        </>
    );
}

export default StoriesPage;