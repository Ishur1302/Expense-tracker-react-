import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!amount || !desc) return;

    const newTransaction = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount),
      type,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDesc("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const balance = transactions.reduce(
    (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
    0
  );

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <h2>Balance: ₹{balance.toFixed(2)}</h2>

      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      <ul>
        {transactions.map((t) => (
          <li key={t.id} className={t.type}>
            {t.desc}: ₹{t.amount.toFixed(2)}
            <button className="delete" onClick={() => deleteTransaction(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;