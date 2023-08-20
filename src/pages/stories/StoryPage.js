import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { axiosReq } from "../../api/axiosDefaults";
import Story from "./Story";
import { Accordion, Card, Container } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import appStyles from "../../App.module.css";
import styles from "../../styles/StoryPage.module.css";


function StoryPage({storyId}) {
    const [story, setStory] = useState({ results: [] });
    const [comments, setComments] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: story }, { data: comments } ] = await Promise.all([
                axiosReq.get(`/stories/${storyId}`),
                axiosReq.get(`/comments/?story=${storyId}`),
            ]);
                setStory({ results: [story] });
                setComments(comments);
            } catch (err) {
                console.log(err);
            }
            };

        handleMount();
        }, [storyId]);

    return (
        <Row className="h-100 mx-0">
            <Col className="py-2 p-0 p-lg-2">
                <Story {...story.results[0]} setStories={setStory} />
                <Container className="px-0">
                <Accordion>
                    <Card className={`${appStyles.Card} ${styles.BorderTop}`}>
                        <Card.Header className={`${styles.Accordion} text-right p-0`}>
                            <Accordion.Toggle 
                                as={Card.Header} 
                                eventKey="comments-section" 
                                className={`${styles.Accordion} pt-1 pb-2`}
                            >
                                <div>
                                    <span><i className="far fa-comments" /></span>
                                    <span className='pt-1 mr-2'>count</span>
                                </div>  
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="comments-section" className={styles.Collapse}>
                            <Card.Body className="pt-0">
                                {currentUser ? (
                                    <CommentCreateForm
                                        profile_id={currentUser.profile_id}
                                        profileImage={profile_image}
                                        story={storyId}
                                        setStory={setStory}
                                        setComments={setComments}
                                        />
                                    ) : comments.results.length ? (
                                        <p className="mt-3 ml-3"><strong>Comments</strong></p>
                                    ) : null}
                                    {comments.results.length ? (
                                        comments.results.map((comment) => (
                                            <Comment 
                                                key={comment.id} 
                                                {...comment}
                                                setStory={setStory} 
                                                setComments={setComments}/>
                                        ))
                                    ) : currentUser ? (
                                        <span className={styles.Message}>No comments yet, be the first to comment!</span>
                                    ) : (
                                        <span className={styles.Message}>No comments... yet</span>
                                    )}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                    
                </Container>
            </Col>
        </Row>
    );
}

export default StoryPage;