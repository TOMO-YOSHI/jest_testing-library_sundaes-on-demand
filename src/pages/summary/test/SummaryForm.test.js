
import { render, screen, fireEvent, getByText, queryByText, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SummaryForm from '../SummaryForm';

test("Initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name:  /terms and conditions/i});
    const button = screen.getByRole("button", { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();
})

test("Checkbox disables button on first click and enables on second click", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name:  'I agree to Terms and Conditions'});
    const button = screen.getByRole("button", { name: "Confirm order" });

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
})

test('popover responds to hover', async() => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
        /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    
    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
        /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    // eslint-disable-next-line testing-library/await-async-utils
    await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
    );
    // const nullPopoverAgain = screen.queryByText(
    //     /no ice cream will actually be delivered/i
    // );
    // expect(nullPopoverAgain).not.toBeInTheDocument()
})