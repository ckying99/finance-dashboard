import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'
import { useFinanceStore } from './store/useFinanceStore.js'
import { useFilteredTransactions } from './store/useFilteredTransactions.js'
import { useBudgets } from './hooks/useBudgets.js'

export default function SpendingByCategory(){
    const selectedCategories = useFinanceStore((state) => state.selectedCategories)
    const dateRange = useFinanceStore((state) => state.dateRange)
    const { data: transactions, isLoading, error } = useFilteredTransactions(selectedCategories,dateRange)
    const { data: budgets } = useBudgets();
    if (isLoading) return <div>Loading...</div>

    const grouped = {}
    for (const t of transactions) {
        if (t.amount < 0) {
            const cat = t.category
            grouped[cat] = (grouped[cat] || 0) + Math.abs(t.amount)
        }
    }
    const getMonths = (dateRange, transactions) => {
        if (dateRange?.from && dateRange?.to) {
            const diffDays = (dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)
            return Math.max(1, Math.round(diffDays / 30))
        }
        // no filter — derive from data
        if (!transactions?.length) return 1
        const dates = transactions.map(t => new Date(t.date))
        const min = Math.min(...dates)
        const max = Math.max(...dates)
        const diffDays = (max - min) / (1000 * 60 * 60 * 24)
        return Math.max(1, Math.round(diffDays / 30))
    }
    const months = getMonths(dateRange)

    const chartData = budgets.map(b => ({
        category: b.category,
        spent: parseFloat(grouped[b.category]?.toFixed(2)),
        budget: parseFloat((b.limit * months).toFixed(2))
        }))
// grouped = { Food: 172.4, Transport: 134.5, ... }
    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="spent" fill="#3b82f6" />
            <Bar dataKey="budget" fill="#e5e7eb" />
        </BarChart>
    )
}