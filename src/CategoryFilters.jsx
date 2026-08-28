import useBudgets from './hooks/useBudgets.js'
import { useFinanceStore } from './store/useFinanceStore.js'

const CategoryFilters = () => {
    const { data: budgets, isLoading, error, refetch } = useBudgets();
    const toggleCategory = useFinanceStore((state) => state.toggleCategory);
    const selectedCategories = useFinanceStore((state) => state.selectedCategories);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message} <button onClick={refetch}>Retry</button></p>

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {budgets.map((category) => {
                const isToggled = selectedCategories.includes(category.category);
                return (
                    <button
                        key={category.id}
                        onClick={() => toggleCategory(category.category)}
                        className={
                            isToggled
                                ? "px-3 py-1 text-sm rounded-full border border-blue-500 bg-blue-500 text-white transition-colors"
                                : "px-3 py-1 text-sm rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                        }
                    >
                        {category.category}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryFilters