import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { axiosReq } from "../../api/axiosDefaults";
import Destination from "./Destination";

function DestinationPage({destinationId}) {
    const [destination, setDestination] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: destination }] = await Promise.all([
                axiosReq.get(`/destinations/${destinationId}`),
                ]);
                setDestination({ results: [destination] });
            } catch (err) {
                console.log(err);
            }
            };

        handleMount();
        }, [destinationId]);

    return (
        <Row>
            <Col>
                <Destination {...destination.results[0]} setDestinations={setDestination} />
            </Col>
        </Row>
    );
}

export default DestinationPage;