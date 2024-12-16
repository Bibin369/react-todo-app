import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

export default function TodoList(props) {
    const { list, filter, mode, query } = props.data;
    const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery, setSortBy } = props.actions;
    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
    const items = search(applyFilter(list, filter), query);

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    <Header {...{ addNew, mode, query, setSearchQuery }} />
                    {/* Add Sorting Options */}
                    <div className="sorting-options">
                        <select onChange={(e) => setSortBy(e.target.value)} className="form-control">
                            <option value="dueDateAsc">Sort by Due Date (Asc)</option>
                            <option value="dueDateDesc">Sort by Due Date (Desc)</option>
                            <option value="priority">Sort by Priority</option>
                        </select>
                    </div>
                    <FilteredList 
                        items={items} 
                        changeStatus={changeStatus} 
                        sortOption={props.data.sortOption} // Pass the sortOption
                    />
                    <Footer {...{ activeItemCount, filter, changeFilter, mode, changeMode }} />
                    <Info {...{ mode }} />
                </div>
            </div>
        </div>
    );
}
