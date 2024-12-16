import React, { useState } from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const { data, changeStatus } = props;
    const [tempChecked, setTempChecked] = useState(data.completed);
    const [showDialog, setShowDialog] = useState(false); // State to show confirmation dialog

    // Handle the temporary checkbox state change
    const handleTempChange = (checked) => {
        setTempChecked(checked);
        setShowDialog(true); // Show the confirmation dialog
    };

    // Handle the confirmation (either confirm or cancel)
    const handleConfirm = (confirmedChecked) => {
        if (confirmedChecked) {
            changeStatus(data.id, tempChecked); // Confirm and update the task status
        } else {
            setTempChecked(data.completed); // Reset to original state on cancel
        }
        setShowDialog(false); // Close the dialog
    };

    const className = `todo-item ui-state-default ${data.completed ? 'completed' : 'pending'}`;

    // Ensure priority is available and has a fallback value if undefined
    const priority = data.priority ? data.priority.toLowerCase() : 'medium'; // Default to 'medium' if no priority

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox
                        checked={data.completed}
                        tempChecked={tempChecked}
                        onTempChange={handleTempChange}
                    />
                    {data.text}
                    <span className={`priority ${priority}`}>
                        {data.priority || 'Medium'} {/* Show priority */}
                    </span>
                </label>
            </div>

            {showDialog && (
                <div className="confirmation-dialog">
                    <p className="text-dialog">Are you sure you want to {tempChecked ? 'mark this task as completed' : 'mark this task as pending'}?</p>
                    <button onClick={() => handleConfirm(true)} className="btn btn-primary">Confirm</button>
                    <button onClick={() => handleConfirm(false)} className="btn btn-secondary">Cancel</button>
                </div>
            )}
        </li>
    );
}
