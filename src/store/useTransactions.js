import { useQuery } from '@tanstack/react-query'

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetch('http://localhost:3001/transactions').then(r => r.json()),
  })
}

export default useTransactions