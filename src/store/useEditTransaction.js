import { useMutation } from '@tanstack/react-query'

const useEditTransaction = () => {
    return useMutation({
        mutationFn: async (updatedTransaction) => {
            const res = await fetch(`http://localhost:3001/transactions/${updatedTransaction.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTransaction),
            })
            if (!res.ok) throw new Error('Failed to edit transaction')
            return res.json()
        }
    })
}

export default useEditTransaction