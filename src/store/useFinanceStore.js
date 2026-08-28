import { create } from 'zustand'

export const useFinanceStore = create((set,get) => ({
    selectedCategories: [],
    toggleCategory: (category) =>{
        if (get().selectedCategories.includes(category)){
            set({ selectedCategories: get().selectedCategories.filter(cat => cat !== category)})
        }
        else{
            set({ selectedCategories:[...get().selectedCategories, category]})
        }
    },

    dateRange: { from: undefined, to: undefined },
    setDateRange: (range) => set({ dateRange: range }),
}))
    