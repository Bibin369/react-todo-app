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

    // Format and display due date if available in a professional format
    const dueDate = data.dueDate ? new Date(data.dueDate).toLocaleDateString('en-US', {
        weekday: 'long', // e.g., "Monday"
        year: 'numeric', // e.g., "2024"
        month: 'long', // e.g., "December"
        day: 'numeric', // e.g., "16"
    }) : null;

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox
                        checked={tempChecked}  // Use the temporary state for the checkbox
                        onTempChange={handleTempChange}  // Handle checkbox change
                    />
                    {data.text}
                    <span className={`priority ${priority}`}>
                        {data.priority || 'Medium'} {/* Show priority */}
                    </span>
                    {/* Display the due date if available */}
                    {dueDate && (
                        <span className="due-date">
                            Due: {dueDate}
                        </span>
                    )}
                </label>
            </div>

            {showDialog && (
                <div className="confirmation-dialog">
                    <p className="text-dialog">
                        Are you sure you want to {tempChecked ? 'mark this task as completed' : 'mark this task as pending'}?
                    </p>
                    <button onClick={() => handleConfirm(true)} className="btn btn-primary">Confirm</button>
                    <button onClick={() => handleConfirm(false)} className="btn btn-secondary">Cancel</button>
                </div>
            )}
        </li>
    );
}
