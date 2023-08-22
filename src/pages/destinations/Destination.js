import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Destination.module.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';


const Destination = (props) => {

    const {
        id,
        destination,
        activities,
        priority,
        story_tag,
    } = props;

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/destinations/${id}/edit`);
      };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/destinations/${id}/`);
            history.goBack();
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
                                        <strong>{destination}</strong>
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <Card.Text className='text-right mr-4'>
                                        <strong>Priority: </strong>
                                            {priority == "1" ? (
                                                <span>Now</span>
                                            ) : priority == "2" ? (
                                                <span>Soon</span>
                                            ) : priority == "3" ? (
                                                <span>Within 3 years</span>
                                            ) : priority == "4" ? (
                                                <span>Within 5 years</span>
                                            ) : priority == "5" ? (
                                                <span>Might happen</span>
                                            ): (
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
                                <Card.Subtitle className='mb-2'><strong>Activities:</strong></Card.Subtitle>
                                <Card.Text>
                                    {activities}
                                </Card.Text>
                            </Col>
                        </Card.Body>
                    </Row>
                    <Row>
                        <Card.Body className='py-0'>
                            <Row>
                                <Col sm={12} md={7} className='pb-3'>
                                    <span className='mr-2'>Stories:</span>
                                        {story_tag && (story_tag.map((story)=>{
                                            return (<span><Badge pill variant="light" className={`${styles.Badge} m-1`}>{story}</Badge></span>)
                                        }))}
                                       
                                </Col>
                                <Col sm={12} md={5} className='text-right pb-3'>
                                    <Button className={`${btnStyles.Button} p-0`} type="submit" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                    <Button className={`${btnStyles.Button} ${btnStyles.Change} p-0`} type="submit" onClick={handleEdit}>
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