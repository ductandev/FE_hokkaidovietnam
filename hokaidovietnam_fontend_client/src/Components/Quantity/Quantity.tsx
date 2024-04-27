import { useState } from 'react';

import "./styles.scss";

type PropTypes = {
    defaultValue: number;
    onChanged?: Function
}

function Quantity(props: PropTypes) {
    const { defaultValue, onChanged } = props
    const [value, setValue] = useState(defaultValue);

    const increment = () => {
        const param = value + 1
        setValue(param);
        onChanged && onChanged(param)
    }

    const decrement = () => {
        if (value <= 1) return;

        const param = value - 1;
        setValue(param);
        onChanged && onChanged(param)
    }

    const onChangeInput = (input: number | string) => {
        setValue(+input);
        onChanged && onChanged(input);
    }

    return (
        <div className="quantity-input">
            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                &mdash;
            </button>

            <input className="quantity-input__screen" type="text" value={value} onChange={(e) => {
                onChangeInput(e.target.value)
            }} />

            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
                &#xff0b;
            </button>
        </div>
    )
}

export default Quantity