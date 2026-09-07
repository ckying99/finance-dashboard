import { useQuery } from '@tanstack/react-query'

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/transactions`).then(r => r.json()),
  })
}

export default useTransactions