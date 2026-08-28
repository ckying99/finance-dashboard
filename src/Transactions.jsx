import { useState, useEffect } from 'react'
import useTransactions from './store/useTransactions.js'
import { useFilteredTransactions } from './store/useFilteredTransactions.js'
import { useFinanceStore } from './store/useFinanceStore.js'
import useDeleteMutation from './store/useDeleteMutation.js'
import DeleteTransactionDialog from './DeleteTransactionDialog.jsx'
import useEditTransaction from './store/useEditTransaction.js'

const Transactions = () => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditRow((prev) => ({ ...prev, [name]: value }))
    }

    const deleteMutation = useDeleteMutation()  // call hook here
    const [editId, setEditId] = useState("");
    const [editRow, setEditRow] = useState({
        id: editId,
        date: new Date().toISOString().split('T')[0],
        merchant: '',
        category: '',
        amount: '',
        note: '',
    })
    const editMutation = useEditTransaction();
    const selectedCategories = useFinanceStore((state) => state.selectedCategories)
    const dateRange = useFinanceStore((state) => state.dateRange)
    const { data: transactions, isLoading, error } = useFilteredTransactions(selectedCategories, dateRange)
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message} <button onClick={refetch}>Retry</button></p>

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
                    </tr>
                </thead>
                {/* align columns with the header */}
                <tbody className="divide-y divide-gray-100">
                    {transactions?.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                            {editId == transaction.id ?
                                <>
                                    <td className="py-2 px-3 text-gray-400">{transaction.id}</td>
                                    <td className="py-2 px-3"><input onChange={handleChange} type="date" name="date" defaultValue={transaction.date} className="border rounded px-2 py-1 text-sm" /></td>
                                    <td className="py-2 px-3"><input onChange={handleChange} type="text" name="merchant" defaultValue={transaction.merchant} className="border rounded px-2 py-1 text-sm" /></td>
                                    <td className="py-2 px-3"><input onChange={handleChange} type="text" name="category" defaultValue={transaction.category} className="border rounded px-2 py-1 text-sm" /></td>
                                    <td className="py-2 px-3"><input onChange={handleChange} type="number" name="amount" defaultValue={transaction.amount} step="0.01" className="border rounded px-2 py-1 text-sm" /></td>
                                    <td className="py-2 px-3"><input onChange={handleChange} type="text" name="note" defaultValue={transaction.note} className="border rounded px-2 py-1 text-sm" /></td>
                                    <td>
                                        <button onClick={() => editMutation.mutate(editRow)} className="text-green-600 text-xs mr-2">Save</button>
                                        <button onClick={() => setEditId(null)} className="text-gray-500 text-xs">Cancel</button>
                                    </td>
                                </>
                                :
                                <>
                                    <td className="py-2 px-3 text-gray-400">{transaction.id}</td>
                                    <td className="py-2 px-3 text-gray-600">{transaction.date}</td>
                                    <td className="py-2 px-3 text-gray-900">{transaction.merchant}</td>
                                    <td className="py-2 px-3 text-gray-600">{transaction.category}</td>
                                    <td className="py-2 px-3 text-right text-gray-900">{transaction.amount}</td>
                                    <td className="py-2 px-3 text-gray-500">{transaction.note}</td>
                                </>
                            }
                            <td>
                                <button className="text-blue-600 text-xs mr-2"
                                    onClick={() => {
                                        setEditId(transaction.id);
                                        setEditRow({
                                            id: transaction.id,
                                            date: transaction.date,
                                            merchant: transaction.merchant,
                                            category: transaction.category,
                                            amount: transaction.amount,
                                            note: transaction.note,
                                        })

                                    }}>Edit</button>
                                <DeleteTransactionDialog onConfirm={() => deleteMutation.mutate(transaction.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default Transactions
