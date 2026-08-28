import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAddTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
      mutationFn: async (newTransaction) => {
      const res = await fetch('http://localhost:3001/transactions')
      const existing = await res.json()
      const nextId = existing.length > 0 ? Math.max(...existing.map(t => Number(t.id))) + 1 : 1

      const postRes = await fetch(`http://localhost:3001/transactions/${nextId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: nextId, ...newTransaction }),
      })
      if (!postRes.ok) throw new Error('Failed to add transaction')
      return postRes.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

export default useAddTransaction