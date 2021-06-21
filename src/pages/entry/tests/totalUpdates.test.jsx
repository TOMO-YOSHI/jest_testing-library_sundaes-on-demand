import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal when scoops change', async()=>{
    render(<Options optionType='scoops' />);

    // make sure total starts out $0.00
    const scoopSubtotal = screen.getByText('Scoops tota: $', {exact: false});
    expect(scoopSubtotal).toHaveTextContent('0.00');

    // update vanila scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
});