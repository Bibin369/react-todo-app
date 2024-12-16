import React from 'react';

export default function CheckBox(props) {
    const { tempChecked, onTempChange } = props;

    const handleChange = (e) => {
        const value = e.target.checked;
        onTempChange(value); // Notify parent about the temporary state change
    };

    return (
        <input
            type="checkbox"
            checked={tempChecked}  // Use the temporary checked state passed from the parent
            onChange={handleChange}
        />
    );
}
