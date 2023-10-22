import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/table';
import Input from './components/input';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items') || '[]'));
  const [hasWarning, setHasWarning] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!description || !+amount || !date) {
      setHasWarning(true);
      return;
    }
    const newItem = {
      id: Date.now(),
      description,
      amount,
      date
    };

    setItems([...items, newItem]);
    setHasWarning(false);
    setDescription('');
    setAmount('');
    setDate('');
  };
  const updateHandeler = (item) => {
    setDescription(item.description);
    setAmount(item.amount);
    setDate(item.date);
  };
  return (
    <div className="container">
      <header className="header">
        <h1>Expense Tracker</h1>
      </header>
      <form className="form" onSubmit={handleFormSubmit}>
        <Input
          label={"Description"}
          id={"description"}
          value={description}
          onChange={setDescription}
          hasWarning={hasWarning && !description}
        />

        <Input
          label={"Amount"}
          id={"amount"}
          type={"number"}
          value={amount}
          onChange={setAmount}
          hasWarning={hasWarning && +amount <= 0}
        />

        <Input
          label={"Date"}
          id={"date"}
          type={"date"}
          value={date}
          onChange={setDate}
          hasWarning={hasWarning && !date}
        />

        <button className='btn' type="submit">Add Expense</button>
      </form>
      <Table items={items} setItems={setItems} updateHandeler={updateHandeler} />
    </div>
  );
}

export default App;