import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants'

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function userOrderDetails() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
    };

    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}


export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const [ totals, setTotals ] = useState({
        scoops: 0,
        toppings: 0,
        grandTotal: 0
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: scoopsSubtotal,
            toppings: toppingsSubtotal,
            grandTotal
        })
    }, [optionCounts])

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {

            const { optionType: optionMap } = optionCounts;
            const newOptionMap = new Map(optionMap);

            newOptionMap.set(itemName, parseInt(newItemCount));

            const newOptionCounts = {  ...optionCounts };
            newOptionCounts[optionType] = newOptionMap;

            setOptionCounts(newOptionCounts);
        }

        // getter: object containing option counts for scoops and toppings, subtotals
        // setter: updateOptionCount
        return [{ ...optionCounts, totals }, updateItemCount]
    }, [optionCounts, totals])

    return <OrderDetails.Provider value={value} {...props} />
}