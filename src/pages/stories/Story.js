import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Card, Col, Media, Row } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../styles/Story.module.css";
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';


const Story = (props) => {

    const {
        id,
        owner,
        title,
        destination,
        content,
        image,
        created_at,
        profile_id,
        profile_image,
        like_id,
        likes_count,
        comments_count,
        save_id,
        setStories, 
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/stories/${id}/edit`);
      };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/stories/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { story: id });
            setStories((prevStories) => ({
                ...prevStories,
                results: prevStories.results.map((story) => {
                return story.id === id
                    ? { ...story, likes_count: story.likes_count + 1, like_id: data.id }
                    : story;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleSave = async () => {
        try {
            const { data } = await axiosRes.post("/saves/", { story: id });
            setStories((prevStories) => ({
                ...prevStories,
                results: prevStories.results.map((story) => {
                return story.id === id
                    ? { ...story, save_id: data.id }
                    : story;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setStories((prevStories) => ({
                ...prevStories,
                results: prevStories.results.map((story) => {
                return story.id === id
                    ? { ...story, likes_count: story.likes_count - 1, like_id: null }
                    : story;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnsave = async () => {
        try {
            await axiosRes.delete(`/saves/${save_id}/`);
            setStories((prevStories) => ({
                ...prevStories,
                results: prevStories.results.map((story) => {
                return story.id === id
                    ? { ...story, save_id: null }
                    : story;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <Card className='mb-4'>
            <Card.Body className={styles.CardHeader}>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {destination && <Card.Subtitle className="text-center mb-3"><strong>{destination}</strong></Card.Subtitle>}
                {created_at && <Card.Text className='text-center mb-0'>created: {created_at}</Card.Text>}
            </Card.Body>
                <Card.Img src={image} alt={title} className={`${styles.CardImage} m-auto`}/>
            <Card.Body className={styles.CardContent}>  
                <Row>
                    <Col>
                        <div className='d-flex justify-content-end'>
                        {is_owner ? (
                                    <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>You can't like your own stories!</Tooltip>}
                                    >
                                        <span className={styles.CantLikeSave}>
                                            <i className={`fa-solid fa-heart`}/>
                                        </span>
                                    </OverlayTrigger>
                                ) : like_id ? (
                                    <span onClick={handleUnlike} className={styles.Heart}>
                                        <i className="fa-solid fa-heart" />
                                    </span>
                                ) : currentUser ? (
                                    <span onClick={handleLike} className={styles.Heart}>
                                        <i className="fa-regular fa-heart" />
                                    </span>
                                ) : (
                                    <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Log in to like stories!</Tooltip>}
                                    >
                                        <span className={styles.Heart}>
                                            <i className="fa-regular fa-heart" />
                                        </span>
                                    </OverlayTrigger>
                                )}
                            <span className='pt-1 mr-2'>{likes_count}</span>
                            {is_owner ? (
                                <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>You can't save your own stories!</Tooltip>}
                                >
                                    <span className={styles.CantLikeSave}>
                                        <i className="fa-regular fa-bookmark" />
                                    </span>
                                </OverlayTrigger>
                            ) : save_id ? (
                                <span onClick={handleUnsave}>
                                    <i className="fa-solid fa-bookmark" />
                                </span>
                            ) : currentUser ? (
                                <span onClick={handleSave}>
                                    <i className="fa-regular fa-bookmark" />
                                </span>
                            ) : (
                                <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Log in to save stories!</Tooltip>}
                                >
                                    <i className="fa-regular fa-bookmark" />
                                </OverlayTrigger>
                            )}
                            {is_owner && (<MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />)}
                        </div>
                    </Col>
                </Row>
                <div className="d-flex pt-3">
                    <Media className={`${styles.Media} align-items-top justify-content-between`}>
                        <Link to={`/profiles/${profile_id}`}>
                            <div>
                                <Avatar src={profile_image} height={55} />
                            </div>
                            <div className='text-center'>
                                {owner}
                            </div>
                        </Link>
                    </Media>
                    {content && <Card.Text className={styles.Content}>{content}</Card.Text>}
                </div>   
                <div className="d-flex justify-content-end">
                    <span><i className="far fa-comments" /></span>
                    <span className='pt-1 mr-2'>{comments_count}</span>
                </div>          
                {/*<hr className={`${styles.PageDivider}`} /> */}
            </Card.Body>
        </Card>
    );

};

export default Story