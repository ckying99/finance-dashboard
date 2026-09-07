import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEditTransaction = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (updatedTransaction) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions/${updatedTransaction.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTransaction),
            })
            if (!res.ok) throw new Error('Failed to edit transaction')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },
    })
}

export default useEditTransaction