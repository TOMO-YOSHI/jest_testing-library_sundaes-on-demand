import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function ScoopOption({ name, imagePath, updateItemCount }) {

    return (
        <Col xs={12} sm={6} lg={3} style={{textAlign: 'center'}}>
            <img style={{width: '75%'}} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
            <Form.Group controlId={`${name}-count`}>
                <Form.Label>{name}</Form.Label>
                <Form.Control type='number' defaultValue={0} />
            </Form.Group>
        </Col>
    )
}
