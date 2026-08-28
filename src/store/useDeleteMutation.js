import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) =>
      fetch(`http://localhost:3001/transactions/${id}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    }
  })
}

export default useDeleteMutation