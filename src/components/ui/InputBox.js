import React from 'react';
import enhance from '../hoc/wrapInputBox';  

function InputBox(props) {
    const { value, handleChange, handleKeyUp, priority, handlePriorityChange, dueDate, handleDueDateChange } = props;

    return (
        <div>
            <input
                autoFocus
                type="text"
                className="form-control add-todo"
                value={value}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                placeholder="Add New Task"
            />
            <select
                value={priority}
                onChange={handlePriorityChange}
                className="form-control priority-select"
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            {/* Due Date Picker */}
            <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                className="form-control due-date-select"
            />
        </div>
    );
}

export default enhance(InputBox);
