import React, { useEffect, useState } from 'react';
import btnStyles from "../../styles/Button.module.css";
import { Button, Container, Image } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';
import headerImage from "../../assets/road.jpg";
import styles from "../../App.module.css";
import Destination from './Destination';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';


function BucketlistPage({filter = "" }) {

    const [destinations, setDestinations] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const { id } = useParams();
    const currentUser = useCurrentUser();
        

    return (
        <div>
            <Image src={headerImage} alt="header image" className={`${styles.HeaderImage} img-fluid`}/>
            <Container className='mt-5'>
                <div className='text-right'>
                    <Button className={`${btnStyles.Button} ${btnStyles.Bright} py-0 mb-3`}>
                        <Link to="/destination/create">
                            <i className="fa-solid fa-plus" />Add destination
                        </Link>
                    </Button>
                </div>
            </Container>
        </div>
    )
;}

export default BucketlistPage;