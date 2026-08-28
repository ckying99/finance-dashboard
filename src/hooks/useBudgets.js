import { useQuery } from '@tanstack/react-query'

export function useBudgets() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: () => fetch('http://localhost:3001/budgets').then(r => r.json()),
  })
}

export default useBudgets;