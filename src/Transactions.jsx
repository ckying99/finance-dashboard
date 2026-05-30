import { useState, useEffect } from 'react'
import './App.css'

function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
  }, [])

 const transactionsRows = transactions ? transactions.map((transaction) => (
  <tr key={transaction.id}>
    <td>{transaction.id}</td>
    <td>{transaction.date}</td>
    <td>{transaction.merchant}</td>
    <td>{transaction.category}</td>
    <td>{transaction.amount}</td>
    <td>{transaction.note}</td>
  </tr>
)) : <></>;
  
  return (
    <>
    {/* make a decently themed table */}
    <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
            <tr className="text-center"> 
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Merchant</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Note</th>
            </tr>
        </thead>
        {/* align columns with the header */}
        <tbody className="text-center">
            {transactionsRows}
        </tbody>
    
    </table>
    
    </>
  )
}

export default Transactions
