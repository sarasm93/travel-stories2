import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import headerImage from "../../assets/surfing.jpg";
import appStyles from "../../App.module.css";
import styles from "../../styles/StoriesPage.module.css";
import { Card, Image } from "react-bootstrap";

function StoriesPage() {
  
    return (
        <>
            <Image src={headerImage} alt="header image" className={`${appStyles.HeaderImage} img-fluid`}/>
            <Card className={`${styles.Card} text-center`}>
                <Card.Body >
                    <Card.Title className={styles.IntroTitle}>Share your travel story!</Card.Title>
                    <Card.Subtitle className={styles.IntroSubtitle}>
                        Discover new places and meet new people. Be inspired and make your travel bucket list.
                        Join now!
                    </Card.Subtitle>
                </Card.Body>
            </Card>
            <Row className="h-100">
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <p>Popular profiles for desktop</p>
                </Col>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <p>Popular profiles mobile</p>
                    <p>List of posts here</p>
                </Col>
            </Row>
        </>
    );
}

export default StoriesPage;