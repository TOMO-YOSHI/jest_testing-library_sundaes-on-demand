// import { render, screen } from '@testing-library/react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
// import { OrderDetailsProvider } from '../../../contexts/OrderDetails'

test('update scoop subtotal when scoops change', async()=>{
    // render(<Options optionType='scoops' />, {wrapper: OrderDetailsProvider});
    render(<Options optionType='scoops' />);

    // make sure total starts out $0.00
    const scoopSubtotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopSubtotal).toHaveTextContent('0.00');

    // update vanila scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async() => {
    render(<Options optionType="toppings" />);

    // make sure total starts out $0.00
    const toppingSubtotal = screen.getByText("Toppings total: $", {
        exact: false,
    });
    expect(toppingSubtotal).toHaveTextContent("0.00");

    // update cherries toppings to be checked and check the subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", {
        name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingSubtotal).toHaveTextContent("1.50");

    // update M&Ms toppings to be checked and check the subtotal
    const mandmsCheckbox = await screen.findByRole("checkbox", {
        name: "M&Ms",
    });
    userEvent.click(mandmsCheckbox);
    expect(toppingSubtotal).toHaveTextContent("3.00");

    // uncheck cherries topping checkbox
    userEvent.click(cherriesCheckbox);
    expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe('grand total', ()=>{
    test('grand total starts at $0.00', ()=>{

    });
    test('grand total updates properly if scoop is added first', ()=>{});
    test('grand total updates properly if toppings is added first', ()=>{});
    test('grand total updates properly if item is removed', ()=>{});
})