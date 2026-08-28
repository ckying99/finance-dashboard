import { useQuery } from '@tanstack/react-query'

export function useFilteredTransactions(categories, date) {
  const parts = categories.map((c) => `category=${c}`)
  if (date?.from) parts.push(`date_gte=${toISO(date.from)}`)
  if (date?.to) parts.push(`date_lte=${toISO(date.to)}`)
  const params = parts.join('&')

  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => fetch(`http://localhost:3001/transactions?` + (params ? params : "")).then(r => r.json()),
  })
}
const toISO = (d) => d.toISOString().slice(0, 10)

export default useFilteredTransactions