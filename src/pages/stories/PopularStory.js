import React from 'react'
import styles from "../../styles/PopularStory.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Card from 'react-bootstrap/Card';

const PopularStory = (props) => {
    const { story, mobile } = props;
    const { id, title, destination, owner, image } = story;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
        >
            <div>
                <Link className={`${styles.Popular}`} to={`/profiles/${id}`}>
                    <Card className={`${styles.Card} overflow-hidden m-2`}>
                        <Card.Img src={image} alt={title} className={styles.CardImage}/>
                        <p><strong>{title}</strong> | {destination}</p>
                    </Card> 
                </Link>
            </div>
            <div className={`${styles.WordBreak}`}>
            </div>
        </div>
    )
}

export default PopularStory;