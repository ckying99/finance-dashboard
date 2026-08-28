import { useState } from 'react'
import useAddTransaction from './store/useAddTransaction'

const emptyForm = () => ({
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    category: '',
    amount: '',
    note: '',
})

const AddTransactionForm = () => {
    const [formData, setFormData] = useState(emptyForm)
    const [error, setError] = useState('')
    const { mutate, isPending } = useAddTransaction()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const amount = Number(formData.amount)
        if (!formData.amount || isNaN(amount)) {
            setError('Amount must be a valid number')
            return
        }
        if (!formData.merchant.trim()) {
            setError('Merchant is required')
            return
        }
        if (!formData.category.trim()) {
            setError('Category is required')
            return
        }
        mutate(
            { ...formData, merchant: formData.merchant.trim(), category: formData.category.trim(), amount },
            { onSuccess: () => setFormData(emptyForm) }
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

            {error && <p className="w-full text-red-500 text-xs">{error}</p>}
        </form>
    )
}

export default AddTransactionForm
