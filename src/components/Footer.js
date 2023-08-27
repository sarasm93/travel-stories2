import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import styles from "../styles/Footer.module.css";
import logo from "../assets/logo.png";
import { Image } from 'react-bootstrap';


const Footer = () => {
    return (
        <div className={`${styles.Footer} pt-2 pb-1 fixed-bottom text-center shadow-lg`}>
            <Link className={`${styles.NavLogo}`} to="/">
                <Image 
                    roundedCircle 
                    src={logo} 
                    alt="logo" 
                    height="30" 
                    className={`${styles.NavImg}`}
                />
                <p className='mb-0'>Travel stories</p>
            </Link>
        </div>
    )
}

export default Footer