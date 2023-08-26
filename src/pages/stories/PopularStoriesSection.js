import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import PopularStory from './PopularStory';
import styles from "../../styles/PopularStoriesSection.module.css";

const PopularStoriesSection = ({mobile}) => {
    const [storyData, setStoryData] = useState({
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
            className={`
            ${mobile && "d-lg-none text-center mb-3"}`}
        >
            {popularStories.results.length ? (
                <>
                    <div className='mx-2 mb-2'>
                        <Card className={`${styles.Header} d-flex shadow-sm`}>
                            <h4 className='m-auto'>Most liked stories</h4>
                        </Card>
                    </div>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularStories.results.slice(0, 3).map((story) => (
                                <PopularStory key={story.id} story={story} mobile />
                            ))}
                        </div>
                    ) : (
                        popularStories.results.slice(0, 5).map((story) => (
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