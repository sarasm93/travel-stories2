import React from 'react';
import PageNotFound from "../assets/page-not-found.png";
import Asset from './Asset';


const NotFound = () => {
    return (
        <div>
            <Asset src={PageNotFound} message="Sorry, this page could not be found." />
        </div>
    )
}

export default NotFound;