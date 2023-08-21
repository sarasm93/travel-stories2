import './App.css';
import "./api/axiosDefaults";
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from "./pages/auth/SignInForm";
import StoryCreateForm from "./pages/stories/StoryCreateForm";
import BucketlistPage from './pages/destinations/BucketlistPage';
import DestinationCreateForm from './pages/destinations/DestinationCreateForm';
import StoriesPage from './pages/stories/StoriesPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import StoryPage from './pages/stories/StoryPage';
import Image from 'react-bootstrap/Image';
import headerImage from "../src/assets/surfing.jpg";
import DestinationPage from './pages/destinations/DestinationPage';
import StoryEditForm from './pages/stories/StoryEditForm';
import PopularStory from './pages/stories/PopularStory';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/">
            <Image src={headerImage} alt="header image" className={`${styles.HeaderImage} img-fluid`}/>
            <div className={`${styles.Intro} text-center`}>
              <h1 className={styles.IntroTitle}>Share your travel story!</h1>
              <h2 className={styles.IntroSubtitle}>
                Discover new places and meet new people. Be inspired and make your travel bucket list. 
                Join now!</h2>
            </div>
            <StoriesPage />
          </Route>
          <Route 
            exact 
            path="/saved" 
            render={() => <StoriesPage 
              filter={`saved__owner__profile=${profile_id}&ordering=-saved__created_at&`}
              />}/>
          <Route exact path="/login"render={() => <SignInForm />}/>
          <Route exact path="/signup" render={() => <SignUpForm />}/>
          <Route exact path="/stories/create" render={() => <StoryCreateForm />}/>
          <Route exact path="/stories/:id" render={() => <StoryPage />}/>
          <Route exact path="/stories/:id/edit" render={() => <StoryEditForm />} />
          <Route exact path="/destinations/:id" render={() => <DestinationPage />} />
          <Route exact path="/bucketlist" render={() => <BucketlistPage 
            filter={`${profile_id}&ordering=-created_at&`}/>}/>
          <Route 
            exact 
            path="/destination/create" 
            render={() => <DestinationCreateForm 
              filter={`saved__owner__profile=${profile_id}&ordering=-saved__created_at&`}
              />}/>
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;