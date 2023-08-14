import React from 'react';
import btnStyles from "../../styles/Button.module.css";
import { Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import headerImage from "../../assets/road.jpg";
import styles from "../../App.module.css";


const BucketlistPage = () => {
  return (
    <div>
        <Image src={headerImage} alt="header image" className={`${styles.HeaderImage} img-fluid`}/>
        <Container className='mt-3'>
            <div className='text-right'>
                <Button className={`${btnStyles.Button} ${btnStyles.Bright}`}>
                    <Link to="/destination/create">
                        <i className="fa-solid fa-plus" />Add destination
                    </Link>
                </Button>
            </div>
        </Container>
    </div>
  )
}

export default BucketlistPage