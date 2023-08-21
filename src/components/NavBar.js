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
            className={`${navStyles.NavLink} ${appStyles.NavIcon} ml-auto pl-0`}
            activeClassName={navStyles.ActiveIcon}
            >
                <i className="fa-solid fa-plus" />
                Create story
        </NavLink>
    )

    const loggedInNavItems = 
        <>
            <NavLink 
                to="/saved"
                className={`${navStyles.NavLink} mr-auto`}
                activeClassName={navStyles.Active}
            >Saved
            </NavLink>
            <NavLink 
                to="/bucketlist"
                className={`${navStyles.NavLink} mr-auto`}
                activeClassName={navStyles.Active}
            >Bucket List
            </NavLink>
            <NavLink 
                to="/"
                className={`${navStyles.NavLink} mr-auto`}
                onClick={handleSignOut}
            >Log Out
            </NavLink>
            <NavLink 
                to={`/profiles/${currentUser?.profile_id}`}
                className={`${appStyles.NavBar} ${appStyles.NavIcon} ${navStyles.NavLink} mr-auto`}
                activeClassName={navStyles.ActiveIcon}>        
            <Avatar src={currentUser?.profile_image} text="Profile" height={38}/>
            </NavLink>
        </>

    const loggedOutNavItems = (
        <>
            <NavLink
                to="/login"
                className={`${navStyles.NavLink} mr-auto`}
                activeClassName={navStyles.Active}
            >Log In
            </NavLink>
            <NavLink 
                to="/signup"
                className={`${navStyles.NavLink} mr-auto`}
                activeClassName={navStyles.Active}
            >Sign Up
            </NavLink>
        </>
      );

    return (
        <Container>
            <Navbar 
                className={`${navStyles.NavBar} shadow-sm pr-0`} 
                expand="lg" 
                fixed="top"
                expanded={expanded}
            >
                <NavLink className={`${navStyles.NavLogo} d-flex`} to="/">
                    <Image roundedCircle src={logo} alt="logo" height="40" className={`${navStyles.NavImg} m-auto`}/>
                    <Navbar.Brand className='pl-2 m-auto'>Travel stories</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle 
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className={navStyles.Collapse} id="basic-navbar-nav">
                    <Nav>
                        <NavLink 
                            exact
                            to="/" 
                            className={`${navStyles.NavLink} mr-auto`}
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