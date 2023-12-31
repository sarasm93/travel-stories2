import React from 'react';
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
import Image from 'react-bootstrap/Image';
import headerImage from "../src/assets/surfing.jpg";
import DestinationPage from './pages/destinations/DestinationPage';
import StoryEditForm from './pages/stories/StoryEditForm';
import DestinationEditForm from './pages/destinations/DestinationEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import PopularStoryPage from './pages/stories/PopularStoryPage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/PasswordForm";
import ProfilePresentationForm from "./pages/profiles/ProfilePresentationForm";
import NotFound from './components/NotFound';
import Footer from './components/Footer';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
        <div className={`${styles.App} `}>
            <NavBar />
            <Container className={`${styles.Main} `}>
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
                        message="You haven't saved any stories yet."
                        />}
                    />
                    <Route exact path="/login" render={() => <SignInForm />}/>
                    <Route exact path="/signup" render={() => <SignUpForm />}/>
                    <Route exact path="/stories/create" render={() => <StoryCreateForm />}/>
                    <Route exact path="/stories/:id" render={() => <PopularStoryPage />}/>
                    <Route exact path="/stories/:id/edit" render={() => <StoryEditForm />} />
                    <Route exact path="/bucketlist" render={() => <BucketlistPage 
                        filter={`owner__profile=${profile_id}&ordering=priority&`} />}
                    />
                    <Route 
                        exact 
                        path="/destination/create" 
                        render={() => <DestinationCreateForm 
                        filter={`saved__owner__profile=${profile_id}&ordering=-saved__created_at&`} 
                        />}
                    />
                    <Route exact path="/destinations/:id" render={() => <DestinationPage />} />
                    <Route 
                        exact 
                        path="/destinations/:id/edit" 
                        render={() => <DestinationEditForm 
                        filter={`saved__owner__profile=${profile_id}&ordering=-saved__created_at&`}/>} 
                    />
                    <Route exact path="/profiles/:id" render={() => <ProfilePage 
                        filter={`owner__profile=${profile_id}&ordering=-created_at`} />} 
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit/username"
                        render={() => <UsernameForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit/password"
                        render={() => <UserPasswordForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit/presentation"
                        render={() => <ProfilePresentationForm />}
                    />
                    <Route 
                        render={() => 
                        <NotFound />} 
                    />
                </Switch>
            </Container>
            <Footer />
        </div>
    );
}

export default App;