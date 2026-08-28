import { useState } from 'react'
import useAddTransaction from './store/useAddTransaction'

const AddTransactionForm = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        merchant: '',
        category: '',
        amount: '',
        note: '',
    })

    const { mutate, isPending } = useAddTransaction()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(
            { ...formData, amount: Number(formData.amount) },
            {
                onSuccess: () => {
                    setFormData({ date: new Date().toISOString().split('T')[0], merchant: '', category: '', amount: '', note: '' })
                }
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end mb-6">
            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Merchant</label>
                <input
                    type="text"
                    name="merchant"
                    value={formData.merchant}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-28"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Note</label>
                <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? 'Adding...' : 'Add'}
            </button>
        </form>
    )
}

export default AddTransactionForm