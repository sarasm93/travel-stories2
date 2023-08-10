import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import navStyles from "../styles/NavBar.module.css";
import appStyles from "../App.module.css";
import logo from "../assets/logo.png";
import Image from 'react-bootstrap/Image';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
        } catch (err) {
          console.log(err);
        }
    };

    const addStoryItem = (
        <NavLink 
            to="/stories/create"
            className={`${navStyles.NavLink} ${appStyles.AddIcon}`}
            activeClassName={navStyles.Active}
            >
            <i className="fa-solid fa-plus" />
            Add story
        </NavLink>
    )

    const loggedInNavItems = 
        <>
            <NavLink 
                to="/saved"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            >Saved Stories
            </NavLink>
            <NavLink 
                to="/bucket"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            >Bucket List
            </NavLink>
            <NavLink 
                to="/"
                className={navStyles.NavLink}
                onClick={handleSignOut}
            >Log Out
            </NavLink>
            <NavLink 
                to={`/profiles/${currentUser?.profile_id}`}
                className={navStyles.NavLink}>        
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>
        </>

    const loggedOutNavItems = (
        <>
            <NavLink 
                to="/login"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            >Log In
            </NavLink>
            <NavLink 
                to="/signup"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            >Sign Up
            </NavLink>
        </>
      );

    return (
        <Container>
            <Navbar 
                className={`${navStyles.NavBar} shadow-sm`} 
                expand="md" 
                fixed="top"
                expanded={expanded}
            >
                <NavLink className={navStyles.NavLogo} to="/">
                    <Image roundedCircle src={logo} alt="logo" height="40" />
                    <Navbar.Brand>Travel Stories</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle 
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink 
                            exact
                            to="/" 
                            className={navStyles.NavLink}
                            activeClassName={navStyles.Active}
                        >Home
                        </NavLink>
                        {currentUser ? loggedInNavItems : loggedOutNavItems}
                    </Nav>
                    {currentUser && addStoryItem}
                </Navbar.Collapse>
            </Navbar>
        </Container>
  );
};

export default NavBar;