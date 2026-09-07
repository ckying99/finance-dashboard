import { useQuery } from '@tanstack/react-query'

export function useBudgets() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/budgets`).then(r => r.json()),
  })
}

export default useBudgets;