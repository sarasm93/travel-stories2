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


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <StoriesPage />}/>
          <Route exact path="/saved" render={() => 
            <StoriesPage message="Saved page not ready yet. Add filter" />}/>
          <Route exact path="/login"render={() => <SignInForm />}/>
          <Route exact path="/signup" render={() => <SignUpForm />}/>
          <Route exact path="/stories/create" render={() => <StoryCreateForm />}/>
          <Route exact path="/stories/:id" render={() => <StoryPage />} />
          <Route exact path="/bucketlist" render={() => <BucketlistPage />}/>
          <Route exact path="/destination/create" render={() => <DestinationCreateForm />}/>
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;