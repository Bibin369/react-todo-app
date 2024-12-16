import React from 'react';
import enhance from '../hoc/wrapInputBox';  

function InputBox(props) {
    const { value, handleChange, handleKeyUp, priority, handlePriorityChange, setPriority } = props;

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
                onChange={(e) => {
                    handlePriorityChange(e);
                    setPriority(e.target.value); // Update priority state
                }}
                className="form-control priority-select"
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    );
}

export default enhance(InputBox);
