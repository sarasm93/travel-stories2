import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import appStyles from '../../App.module.css'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import PopularStory from './PopularStory';
import styles from "../../styles/PopularStoriesSection.module.css";

const PopularStoriesSection = ( {mobile}) => {
    const [storyData, setStoryData] = useState({
    // we will use the pageProfile later!
    popularStories: { results: [] },
  });

  const { popularStories } = storyData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/stories/?ordering=-likes_count"
        );
        setStoryData((prevState) => ({
          ...prevState,
          popularStories: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);


  return (
    <Container 
        className={`${appStyles.Content}
        ${mobile && "d-lg-none text-center mb-3"}`}>
        {popularStories.results.length ? (
        <>
            <Card className={styles.Header}>
              Most liked stories
            </Card>
            {mobile ? (
            <div className="d-flex justify-content-around">
              {popularStories.results.slice(0, 3).map((story) => (
                <PopularStory key={story.id} story={story} mobile />
              ))}
            </div>
          ) : (
            popularStories.results.slice(0, 4).map((story) => (
              <PopularStory key={story.id} story={story} />
              ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularStoriesSection;