import React, { Component } from 'react';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import { getAll, addToList, updateStatus } from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getAll(),
            priority: 'Medium',
            sortOption: 'dueDateAsc', // Default sorting option
        };
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'setPriority', 'setSortBy'])
        });

        return <div>{children}</div>;
    }

    addNew(text, priority, dueDate) {
        const { priority: currentPriority } = this.state;
        let updatedList = addToList(this.state.list, { text, completed: false, priority: currentPriority, dueDate });

        this.setState({ list: updatedList });
    }

    changeFilter(filter) {
        this.setState({ filter });
    }

    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);

        this.setState({ list: updatedList });
    }

    changeMode(mode = MODE_NONE) {
        this.setState({ mode });
    }

    setSearchQuery(text) {
        this.setState({ query: text || '' });
    }

    setPriority(priority) {
        this.setState({ priority });
    }

    setSortBy(sortOption) {
        this.setState({ sortOption }, this.sortList); // Set sorting option and call sortList
    }

    sortList() {
        const { sortOption, list } = this.state;

        let sortedList = [...list]; // Create a shallow copy of the list

        if (sortOption === 'dueDateAsc') {
            sortedList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortOption === 'dueDateDesc') {
            sortedList.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        } else if (sortOption === 'priority') {
            const priorityOrder = ['High', 'Medium', 'Low']; // Order for priority
            sortedList.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
        }

        this.setState({ list: sortedList });
    }
}

export default StateProvider;
