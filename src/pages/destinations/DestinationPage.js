import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Destination from "./Destination";

function DestinationPage() {
    const { id } = useParams();
    const [destination, setDestination] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: destination }] = await Promise.all([
                axiosReq.get(`/destinations/${id}`),
                ]);
                setDestination({ results: [destination] });
                console.log(destination)
            } catch (err) {
                console.log(err);
            }
            };

        handleMount();
        }, [id]);

    return (
        <Row>
            <Col>
                <Destination {...destination.results[0]} setDestinations={setDestination} />
            </Col>
        </Row>
    );
}

export default DestinationPage;