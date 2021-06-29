import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../contexts/OrderDetails';
import App from '../App';

test('order phases for happy path', () => {
    // render
    render(<App />, {wrapper: OrderDetailsProvider});

    // add ice cream scoops and toppings

    // find and click order button

    // check summary information based on order

    // accept terms nad conditions and click button to confirm order

    // confirm order number on confirmation page

    // click "new order" button on confirmation page

    // check that scoops and toppings subtotals have been reset

    // Do we need to await anything to avoid test errors?
})