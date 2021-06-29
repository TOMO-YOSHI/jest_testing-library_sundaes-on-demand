import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
    const [,,resetOrder] = useOrderDetails();
    const [ orderNumber, setOrderNumber ] = useState(null);
    const [error, setError] = useState(false);

    useEffect(()=>{
        axios.post({
            method: 'POST',
            url:`http://localhost:3030/order`
        })
        .then(response => setOrderNumber(response.data.orderNumber))
        .catch(error => setError(true))
    }, [])

    function handleClick() {
        resetOrder();

        setOrderPhase('inProgress');
    }

    if(orderNumber) {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}</p>
                <p>
                    as per our terms and conditions, nothing will happen now
                </p>
                <Button onClick={handleClick}>Create new Order</Button>
            </div>
        );
    } else {
        return <div>Loading</div>;
    }

}
