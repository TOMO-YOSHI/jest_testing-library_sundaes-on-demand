import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../contexts/OrderDetails';
import App from '../App';

test('order phases for happy path', async() => {
    // render
    render(<App />, {wrapper: OrderDetailsProvider});

    // add ice cream scoops and toppings
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})

    userEvent.clear(chocolateInput);
    userEvent.clear(vanillaInput);

    userEvent.type(chocolateInput, '1');
    userEvent.type(vanillaInput, '2');

    const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopsSubtotal).toHaveTextContent('6.00');


    const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"});
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
        name: "Hot fudge",
    });

    userEvent.click(cherriesCheckbox);
    userEvent.click(hotFudgeCheckbox);

    const toppingsSubtotal = screen.getByText('Toppings total: $', {exact: false});
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    const grandTotal = screen.getByText('Grand total: $', {exact: false});
    expect(grandTotal).toHaveTextContent('9.00');

    // find and click order button
    const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
    userEvent.click(orderButton);

    // check summary information based on order
    const scoopsTotal = screen.getByText('Scoops: $', {exact: false});
    expect(scoopsTotal).toHaveTextContent('6.00');

    // const vanillaSummary = screen.getByText('Vanilla', {exact: false});
    // expect(vanillaSummary).toHaveTextContent('2');

    // const chocolateSummary = screen.getByText('Chocolate', {exact: false});
    // expect(chocolateSummary).toHaveTextContent('1');

    // const toppingsTotal = screen.getByText('Toppings: $', {exact: false});
    // expect(toppingsTotal).toHaveTextContent('3.00');

    // const hotFudgeSummary = screen.getByText('Hot fudge');
    // expect(hotFudgeSummary).toHaveTextContent("Hot fudge");

    // const cherriesSummary = screen.getByText('Cherries');
    // expect(cherriesSummary).toHaveTextContent("Cherries");
    expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();
    expect(screen.getByText("Hot fudge")).toBeInTheDocument();


    // accept terms and conditions and click button to confirm order
    const agreeCheckbox = screen.getByRole("checkbox", {
        name: "I agree to Terms and Conditions",
    });
    userEvent.click(agreeCheckbox);

    const confirmButton = screen.getByRole('button', {name: 'Confirm order'});
    userEvent.click(confirmButton);

    // confirm order number on confirmation page
    const thankYouHandler = await screen.findByRole('heading', {name: /thank you/i});
    expect(thankYouHandler).toBeInTheDocument();

    // click "new order" button on confirmation page
    const createNewOrderButton = screen.getByRole('button', {name: /create new order/i});
    userEvent.click(createNewOrderButton);

    // check that scoops and toppings subtotals have been reset
    const scoopsInitialTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsInitialTotal).toBeInTheDocument();
    const toppingsInitialTotal = screen.getByText("Toppings total: $0.00");
    expect(toppingsInitialTotal).toBeInTheDocument();

    await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await screen.findByRole('checkbox', { name: 'Cherries' });

    // Do we need to await anything to avoid test errors?
})