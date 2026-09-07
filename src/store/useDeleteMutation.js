import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) =>
      fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    }
  })
}

export default useDeleteMutation