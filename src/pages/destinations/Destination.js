import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Destination.module.css";
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';


const Destination = (props) => {

    const {
        id,
        destination,
        activities,
        priority,
        saved_story_tag,
    } = props;

    console.log('story_tag: ', saved_story_tag)
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/destinations/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/destinations/${id}/`);
            history.push("/bucketlist"); 
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Card className='p-3 h-100' md={9}>
                <Col>
                    <Row>
                        <Card.Body className='pb-1'>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        {destination && <strong>{destination}</strong>}
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <Card.Text className='text-right mr-4'>
                                        <strong>Priority: </strong>
                                            {priority && 
                                                priority === 1 ? (
                                                    <span>Now</span>
                                                ) : priority === 2 ? (
                                                    <span>Soon</span>
                                                ) : priority === 3 ? (
                                                    <span>Within 3 years</span>
                                                ) : priority === 4 ? (
                                                    <span>Within 5 years</span>
                                                ) : priority === 5 ? (
                                                    <span>Might happen</span>
                                                ) : (
                                                    <span>-----</span>
                                                )}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Row>
                    <Row>
                        <Card.Body>
                            <Col className="p-0" sm={9}>
                                <Card.Subtitle className='mb-2'>
                                    <strong>Activities:</strong>
                                </Card.Subtitle>
                                {activities && <Card.Text>{activities}</Card.Text>}
                            </Col>
                        </Card.Body>
                    </Row>
                    <Row>
                        <Card.Body className='py-0'>
                            <Row>
                                <Col sm={12} md={7} className='pb-3'>
                                    <span className='mr-2'>Story tag:</span>
                                    {saved_story_tag && (saved_story_tag.map((story)=>{ return (
                                        <Link to={`stories/${story.id}`} key={story.id}>
                                            <span >
                                                <Badge pill variant="light" className={`${styles.Badge} m-1`}>
                                                    {story.story}
                                                </Badge>
                                            </span>
                                        </Link>
                                    )}))}
                                </Col>
                                <Col sm={12} md={5} className='text-right pb-3'>
                                    <Button 
                                        className={`${btnStyles.Button} p-0`} 
                                        type="submit" 
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        className={`${btnStyles.Button} ${btnStyles.Change} p-0`} 
                                        type="submit" 
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Row>
                </Col>
            </Card>
        </>
    )
}

export default Destination;