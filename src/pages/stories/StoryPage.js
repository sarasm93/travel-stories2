import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { axiosReq } from "../../api/axiosDefaults";
import Story from "./Story";
import { Accordion, Button, Card, Container } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";


function StoryPage({storyId, comments_count}) {
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
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <Story {...story.results[0]} setStories={setStory} />
                <Container>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <div className="d-flex justify-content-end">
                                    <span><i className="far fa-comments" /></span>
                                </div>  
                            </Accordion.Toggle>
                            <span className='pt-1 mr-2'>{comments_count}</span>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {currentUser ? (
                                    <CommentCreateForm
                                        profile_id={currentUser.profile_id}
                                        profileImage={profile_image}
                                        story={storyId}
                                        setStorys={setStory}
                                        setComments={setComments}
                                        />
                                    ) : comments.results.length ? (
                                        "Comments"
                                    ) : null}
                                    {comments.results.length ? (
                                        comments.results.map((comment) => (
                                            <Comment key={comment.id} {...comment}/>
                                        ))
                                    ) : currentUser ? (
                                        <span>No comments yet, be the first to comment!</span>
                                    ) : (
                                        <span>No comments... yet</span>
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