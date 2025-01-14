import update from 'immutability-helper';

/**
 * Get the list of todo items.
 * @return {Array}
 */
export function getAll() {
    return [
        {
            id: 1,
            text: 'Learn Javascript',
            completed: false,
            priority: 'High', // Default priority
            dueDate: '2024-12-25' // Example due date
        },
        {
            id: 2,
            text: 'Learn React',
            completed: false,
            priority: 'Medium', // Default priority
            dueDate: '2024-12-30' // Example due date
        },
        {
            id: 3,
            text: 'Build a React App',
            completed: false,
            priority: 'Low', // Default priority
            dueDate: '2025-01-05' // Example due date
        }
    ]
}

export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: {$set: completed}
        }
    });
}

/**
 * A counter to generate a unique id for a todo item.
 * Can remove this logic when the todo is created using backend/database logic.
 * @type {Number}
 */
let todoCounter = 1;

function getNextId() {
    return getAll().length + todoCounter++;
}

/**
 * Adds a new item on the list and returns the new updated list (immutable).
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export function addToList(list, data) {
    let item = Object.assign({
        id: getNextId(),
        completed: false, // Default value for completed
        priority: 'Medium', // Default priority value
        dueDate: null // Default value for dueDate (null if not provided)
    }, data);

    return list.concat([item]);
}
