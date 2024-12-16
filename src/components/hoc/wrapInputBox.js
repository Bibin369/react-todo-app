import KeyCode from 'keycode-js';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
    withState('value', 'setValue', props => {
        return props.value || '';
    }),
    withState('priority', 'setPriority', 'Medium'), // Default priority set to Medium
    withHandlers({
        handleKeyUp: ({ addNew, setValue, priority }) => e => {
            const text = e.target.value.trim();

            if (e.keyCode === KeyCode.KEY_RETURN && text) {
                addNew(text, priority); // Passing both task text and priority to addNew
                setValue(''); // Reset input field after adding the task
            }
        },
        handleChange: ({ setValue }) => e => {
            setValue(e.target.value); // Update the task text as user types
        },
        handlePriorityChange: ({ setPriority }) => e => {
            setPriority(e.target.value); // Handle change in priority dropdown
        }
    })
);
