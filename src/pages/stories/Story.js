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

    return (
        <Card >
            <Card.Body className={styles.CardHeader}>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {destination && <Card.Subtitle className="text-center mb-3"><strong>{destination}</strong></Card.Subtitle>}
                {created_at && <Card.Text className='text-center mb-0'>created: {created_at}</Card.Text>}
            </Card.Body>
            <Card.Img src={image} alt={title} />
            <Card.Body className={styles.CardContent}>  
                <div className='text-right'>

                {likes_count}
                <i className="far fa-comments" /><p>Comments count here</p>

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