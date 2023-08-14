import React from 'react';
import btnStyles from "../../styles/Button.module.css";
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const BucketlistPage = () => {
  return (
    <div>
        <Container className='mt-3'>
            <Button className={`${btnStyles.Button} ${btnStyles.Bright}`}>
                <Link to="/destination/create">
                    <i className="fa-solid fa-plus" />Add destination
                </Link>
            </Button>
        </Container>
    </div>
  )
}

export default BucketlistPage