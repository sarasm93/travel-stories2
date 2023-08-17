import { Badge, Button, Card, Col, Image, Row } from 'react-bootstrap';
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Destination.module.css";


const Destination = (props) => {

    const {
        destination,
        activities,
        priority,
        story_tag,
    } = props;

    return (
        <>
            <Card className='p-3 h-100' md={9}>
                <Col>
                    <Row>
                        <Card.Body className='pb-1'>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        <strong>{destination}</strong>
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <Card.Text className='text-right'>
                                        <strong>Priority: </strong>
                                            
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Row>
                    <Row>
                        <Card.Body>
                            <Card.Subtitle className='mb-2'><strong>Activities:</strong></Card.Subtitle>
                            <Card.Text>
                                {activities}
                            </Card.Text>
                        </Card.Body>
                    </Row>
                    <Row>
                        <Card.Body className='py-0'>
                            <Row>
                                <Col sm={12} md={7} className='pb-3'>
                                    <span className='mr-2'>Stories:</span>
                                        <span><Badge pill variant="light" className={`${styles.Badge} m-1`}>{story_tag}</Badge></span>
                                </Col>
                                <Col sm={12} md={5} className='text-right pb-3'>
                                    <Button className={`${btnStyles.Button} p-0`} type="submit">
                                        Delete
                                    </Button>
                                    <Button className={`${btnStyles.Button} ${btnStyles.Change} p-0`} type="submit">
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