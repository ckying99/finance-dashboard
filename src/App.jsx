import { useState } from 'react'
import Transactions from './Transactions.jsx'
import CategoryFilters from './CategoryFilters.jsx'
import DateFilters from './DateFilters.jsx'
import SpendingByCategory from './SpendingByCategory.jsx'
import AddTransactionForm from './AddTransactionForm.jsx'

import './App.css'

function App() {
  return (
    <>
    <AddTransactionForm />
      <CategoryFilters />
      <DateFilters />
      <SpendingByCategory />

      <Transactions />
    </>
  )
}

export default App
