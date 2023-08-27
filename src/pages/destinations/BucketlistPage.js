import React, { useEffect, useState } from 'react';
import btnStyles from "../../styles/Button.module.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import headerImage from "../../assets/road.jpg";
import appStyles from "../../App.module.css";
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import DestinationPage from './DestinationPage';
import NoDestinations from "../../assets/no-stories.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';


function BucketlistPage({filter = ""}) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileDestinations, setProfileDestinations] = useState({ results: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: profileDestinations } = await axiosReq.get(`/destinations/?${filter}`);
                setProfileDestinations(profileDestinations);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [filter]);

    
    const bucketlist = (
        <>
            {profileDestinations.results.length ? (
                <InfiniteScroll
                    dataLength={profileDestinations.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileDestinations.next}
                    next={() => 
                        fetchMoreData(profileDestinations, setProfileDestinations)}
                >
                    {profileDestinations.results.map((destination) => (
                        <DestinationPage 
                            destinationId={destination.id} 
                            key={destination.id} 
                        />
                    ))}
                </InfiniteScroll>
            ) : (
                <Asset
                    src={NoDestinations}
                    message={"You haven't made any destinations yet."}
                />
            )}
        </>
    );


    return (
        <div>
            <Image 
                src={headerImage} 
                alt="header image" 
                className={`${appStyles.HeaderImage} img-fluid`}
            />
            <Container className='mt-5'>
                <div className='text-right'>
                    <Button 
                        className={`
                            ${btnStyles.Button} 
                            ${btnStyles.Bright} py-0 mb-3`}
                    >
                        <Link to="/destination/create">
                            <i className="fa-solid fa-plus" />
                            Add destination
                        </Link>
                    </Button>
                </div>
                {hasLoaded ? (
                    {bucketlist}
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Container>
        </div>
    )
;}

export default BucketlistPage;