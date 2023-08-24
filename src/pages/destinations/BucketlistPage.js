import React, { useEffect, useState } from 'react';
import btnStyles from "../../styles/Button.module.css";
import { Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import headerImage from "../../assets/road.jpg";
import styles from "../../App.module.css";
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
          children={profileDestinations.results.map((destination) => (
            <DestinationPage destinationId={destination.id} key={destination.id} />
          ))}
          dataLength={profileDestinations.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileDestinations.next}
          next={() => fetchMoreData(profileDestinations, setProfileDestinations)}
        />
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
            <Image src={headerImage} alt="header image" className={`${styles.HeaderImage} img-fluid`}/>
            <Container className='mt-5'>
                <div className='text-right'>
                    <Button className={`${btnStyles.Button} ${btnStyles.Bright} py-0 mb-3`}>
                        <Link to="/destination/create">
                            <i className="fa-solid fa-plus" />Add destination
                        </Link>
                    </Button>
                </div>
                {hasLoaded ? (
                    <>
                      {bucketlist}
                
                    </>
                ) : (
                    <Container className={styles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Container>
        </div>
    )
;}

export default BucketlistPage;