import React, { useState } from 'react';
import Input from './input';

export default function Table({ items, setItems, updateHandeler }) {
    const [filter, setFilter] = useState('');
    const [selectedOption, setSelectedOption] = useState('description');

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleUpdate = (item) => {
        updateHandeler(item);
        handleDelete(item.id);
    };

    const handleDelete = (id, hasValidation = false) => {
        const newItems = items.filter((item) => item.id !== id);
        if (hasValidation) {
            if (window.confirm()) {
                setItems(newItems);
            }
        } else {
            setItems(newItems);
        }
    };

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const handleOptionChange = (e) => setSelectedOption(e.target.value);

    const handleFilterItems = (items) => {
        if (!filter) {
            return items
        }
        if (selectedOption === 'description') {
            return items.filter((item) =>
                item.description.toLowerCase().includes(filter.toLowerCase())
            );
        } else if (selectedOption === 'amount') {
            return items.filter((item) => +item.amount == +filter);

        } else if (selectedOption === 'date') {
            return items.filter((item) =>
                item.date.toLowerCase().includes(filter.toLowerCase())
            );
        }
    };

    const filteredItems = handleFilterItems(items);
    const totalAmount = filteredItems.reduce((acc, cur) => {
        return acc + +cur.amount;
    }, 0);

    return (
        <>
            <div>
                <div className="filter-container">
                    <Input
                        value={filter}
                        type={selectedOption !== "date" ? "text" : selectedOption}
                        onChange={handleFilterChange}
                        placeholder="Filter..."
                    />
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="description">Description</option>
                        <option value="amount">Amount</option>
                        <option value="date">Date</option>
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.date}</td>
                                <td className="table-actions">
                                    <button
                                        onClick={() => handleDelete(item.id, true)}
                                        className="btn btn-delete"
                                    >
                                        delete
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(item)}
                                        className="btn btn-edit"
                                    >
                                        update
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="btn btn-view"
                                    >
                                        view
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>{totalAmount}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {showModal && selectedItem && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Item Details</h2>
                        <p>Description: {selectedItem.description}</p>
                        <p>Amount: {selectedItem.amount}</p>
                        <p>Date: {selectedItem.date}</p>
                        <button onClick={handleCloseModal} className="btn btn-close">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>

    );
}