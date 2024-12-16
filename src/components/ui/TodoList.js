import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

export default function TodoList(props) {
    // Destructure necessary props
    const { list, filter, mode, query } = props.data;
    const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery } = props.actions;

    // Apply filter to the list based on active filter (e.g., all, completed, active)
    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;

    // Perform search filtering based on the search query
    const items = search(applyFilter(list, filter), query);

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    {/* Render the Header component */}
                    <Header {...{ addNew, mode, query, setSearchQuery }} />

                    {/* Render the FilteredList component with filtered items */}
                    <FilteredList 
                        items={items} 
                        changeStatus={changeStatus} 
                    />

                    {/* Render the Footer component */}
                    <Footer 
                        {...{ activeItemCount, filter, changeFilter, mode, changeMode }} 
                    />

                    {/* Render the Info component */}
                    <Info {...{ mode }} />
                </div>
            </div>
        </div>
    );
}
