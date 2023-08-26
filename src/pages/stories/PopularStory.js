import React from 'react'
import styles from "../../styles/PopularStory.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Card from 'react-bootstrap/Card';

const PopularStory = (props) => {
    const { story, mobile } = props;
    const { id, title, destination, image } = story;

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
        >
            <div>
                <Link className={`${styles.Popular}`} to={`/stories/${id}`}>
                    <Card className={`${styles.Card} overflow-hidden m-2`}>
                        <Card.Img 
                            src={image} 
                            alt={title} 
                            className={styles.CardImage}
                        />
                        <p><strong>{title}</strong> | {destination}</p>
                    </Card> 
                </Link>
            </div>
        </div>
    )
}

export default PopularStory;