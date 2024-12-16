import KeyCode from 'keycode-js';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
    withState('value', 'setValue', props => props.value || ''),
    withState('priority', 'setPriority', 'Medium'), // Default priority set to Medium
    withState('dueDate', 'setDueDate', ''), // Default due date
    withHandlers({
        handleKeyUp: ({ addNew, setValue, priority, dueDate }) => e => {
            const text = e.target.value.trim();
            if (e.keyCode === KeyCode.KEY_RETURN && text) {
                addNew(text, priority, dueDate); // Passing task text, priority, and due date
                setValue(''); // Reset input field after adding the task
            }
        },
        handleChange: ({ setValue }) => e => {
            setValue(e.target.value); // Update the task text as user types
        },
        handlePriorityChange: ({ setPriority }) => e => {
            setPriority(e.target.value); // Handle change in priority dropdown
        },
        handleDueDateChange: ({ setDueDate }) => e => {
            setDueDate(e.target.value); // Handle change in due date
        }
    })
);
