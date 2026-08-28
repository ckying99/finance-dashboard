import { useState } from 'react'
import { useFilteredTransactions } from './store/useFilteredTransactions.js'
import { useFinanceStore } from './store/useFinanceStore.js'
import useDeleteMutation from './store/useDeleteMutation.js'
import DeleteTransactionDialog from './DeleteTransactionDialog.jsx'
import useEditTransaction from './store/useEditTransaction.js'

const formatAmount = (amount) => {
    const formatted = new Intl.NumberFormat('en-MY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Math.abs(amount))
    return amount < 0 ? `-${formatted}` : `+${formatted}`
}

const Transactions = () => {
    const deleteMutation = useDeleteMutation()
    const editMutation = useEditTransaction()
    const selectedCategories = useFinanceStore((state) => state.selectedCategories)
    const dateRange = useFinanceStore((state) => state.dateRange)
    const { data: transactions, isLoading, error, refetch } = useFilteredTransactions(selectedCategories, dateRange)

    const [editId, setEditId] = useState(null)
    const [editRow, setEditRow] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditRow((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }))
    }

    const startEdit = (t) => {
        setEditId(t.id)
        setEditRow({ id: t.id, date: t.date, merchant: t.merchant, category: t.category, amount: t.amount, note: t.note })
    }

    const saveEdit = () => {
        editMutation.mutate(editRow, {
            onSuccess: () => setEditId(null),
        })
    }

    const cancelEdit = () => setEditId(null)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message} <button onClick={() => refetch()}>Retry</button></p>

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wide">
                        <th className="py-2 px-3 font-medium">Transaction ID</th>
                        <th className="py-2 px-3 font-medium">Date</th>
                        <th className="py-2 px-3 font-medium">Merchant</th>
                        <th className="py-2 px-3 font-medium">Category</th>
                        <th className="py-2 px-3 font-medium text-right">Amount</th>
                        <th className="py-2 px-3 font-medium">Note</th>
                        <th className="py-2 px-3 font-medium"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {transactions?.map((transaction) => {
                        const isEditing = editId === transaction.id
                        return (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="py-2 px-3 text-gray-400">{transaction.id}</td>
                                {isEditing ? (
                                    <>
                                        <td className="py-2 px-3"><input onChange={handleChange} type="date" name="date" value={editRow.date} className="border rounded px-2 py-1 text-sm" /></td>
                                        <td className="py-2 px-3"><input onChange={handleChange} type="text" name="merchant" value={editRow.merchant} className="border rounded px-2 py-1 text-sm" /></td>
                                        <td className="py-2 px-3"><input onChange={handleChange} type="text" name="category" value={editRow.category} className="border rounded px-2 py-1 text-sm" /></td>
                                        <td className="py-2 px-3"><input onChange={handleChange} type="number" name="amount" value={editRow.amount} step="0.01" className="border rounded px-2 py-1 text-sm" /></td>
                                        <td className="py-2 px-3"><input onChange={handleChange} type="text" name="note" value={editRow.note} className="border rounded px-2 py-1 text-sm" /></td>
                                        <td className="py-2 px-3">
                                            <button onClick={saveEdit} className="text-green-600 text-xs mr-2">Save</button>
                                            <button onClick={cancelEdit} className="text-gray-500 text-xs">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-2 px-3 text-gray-600">{transaction.date}</td>
                                        <td className="py-2 px-3 text-gray-900">{transaction.merchant}</td>
                                        <td className="py-2 px-3 text-gray-600">{transaction.category}</td>
                                        <td className={`py-2 px-3 text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {formatAmount(transaction.amount)}
                                        </td>
                                        <td className="py-2 px-3 text-gray-500">{transaction.note}</td>
                                        <td className="py-2 px-3">
                                            <button className="text-blue-600 text-xs mr-2" onClick={() => startEdit(transaction)}>Edit</button>
                                            <DeleteTransactionDialog onConfirm={() => deleteMutation.mutate(transaction.id)} />
                                        </td>
                                    </>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Transactions
