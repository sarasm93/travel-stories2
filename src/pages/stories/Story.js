import React, { useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Card, Media } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../styles/Story.module.css";
import { axiosRes } from '../../api/axiosDefaults';


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
        save_id,
        storyPage,
        setStories,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

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
        <Card>
            <Card.Body className={styles.CardHeader}>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {destination && <Card.Subtitle className="text-center mb-3"><strong>{destination}</strong></Card.Subtitle>}
                {created_at && <Card.Text className='text-center mb-0'>created: {created_at}</Card.Text>}
            </Card.Body>
            <Card.Img src={image} alt={title} />
            <Card.Body className={styles.CardContent}>  
                <div className='text-right'>
                    {is_owner ? (
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own stories!</Tooltip>}
                            >
                                <i className="fa-regular fa-heart" />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={handleUnlike}>
                                <i className="fa-solid fa-heart" />
                            </span>
                        ) : currentUser ? (
                            <span onClick={handleLike}>
                                <i className="fa-regular fa-heart" />
                            </span>
                        ) : (
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like stories!</Tooltip>}
                            >
                                <i className="fa-regular fa-heart" />
                            </OverlayTrigger>
                        )}
                    {likes_count}
                    <i className="far fa-comments" /><p>Comments count here</p>
                    {is_owner ? (
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>You can't save your own stories!</Tooltip>}
                        >
                            <i className="fa-regular fa-bookmark" />
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
                    {is_owner && storyPage && "..."}
                </div>
                <div className="d-flex">
                    <Media className={`${styles.Media} align-items-center justify-content-between`}>
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
            </Card.Body>
        </Card>
    );

};

export default Story