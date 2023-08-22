import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../App.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import StoryPage from "./StoryPage";

import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularStoriesSection from "./PopularStoriesSection";


function StoriesPage({filter = "" }) {
    const [stories, setStories] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchStories = async () => {
          try {
            const { data } = await axiosReq.get(`/stories/?${filter}`);
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
        }, [filter, pathname, currentUser]
    
      );
  
    return (
        <>
            <Row className="h-100 pt-4">
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <PopularStoriesSection />
                </Col>
                <Col className="p-0" lg={8}>
                    <PopularStoriesSection mobile />
                    <Container>
                        {hasLoaded ? (
                            <>
                                {stories.results.length ? (
                                    <InfiniteScroll
                                        children={stories.results.map((story) => (
                                            <StoryPage storyId={story.id} num_of_comments={story.comments_count} key={story.id} />
                                        ))}
                                        dataLength={stories.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!stories.next}
                                        next={() => fetchMoreData(stories, setStories)}
                                    />
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
                </Col>
            </Row>
        </>
    );
}

export default StoriesPage;