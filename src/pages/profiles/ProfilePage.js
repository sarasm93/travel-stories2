import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularStoriesSection from "../stories/PopularStoriesSection";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoStories from "../../assets/no-stories.png";
import StoryPage from "../stories/StoryPage";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileStories, setProfileStories] = useState({ results: [] });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileStories }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/stories/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileStories(profileStories);
        console.log(profileStories)
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="mx-3">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage} roundedCircle src={profile?.image}></Image>
        </Col>
        <Col lg={6} className="mt-4 pl-5">
          <h3 className="mb-3"><strong>{profile?.owner}</strong></h3>
          <p>Location: {profile?.location}</p>
          <p>Bio: {profile?.content}</p>
        </Col>
        <Col lg={3} className="mt-4 pr-3 text-right">
          <p className={`${styles.StoryCount}`}>{profile?.stories_count} stories</p>
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr className={`${styles.PageDivider} mx-5 mt-4`}/>
      <p className={`${styles.Stories} text-center`}><strong>Stories</strong></p>
      <hr className={`${styles.PageDivider} mx-5`}/>
      {profileStories.results.length ? (
        <InfiniteScroll
          children={profileStories.results.map((story) => (
            <StoryPage storyId={story.id} key={story.id} {...story} setStories={setProfileStories} />
          ))}
          dataLength={profileStories.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileStories.next}
          next={() => fetchMoreData(profileStories, setProfileStories)}
        />
      ) : (
        <Asset
          src={NoStories}
          message={`${profile?.owner} hasn't made any stories yet.`}
        />
      )}
    </>
  );

  return (
    <Row className="pt-4">
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularStoriesSection />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularStoriesSection mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
        {hasLoaded ? (
            <>
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
      </Col>
    </Row>
  );
}

export default ProfilePage;