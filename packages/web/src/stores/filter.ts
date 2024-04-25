import { defineStore } from 'pinia'
import { type programFiltersType } from '@/types'

export const useFilterStore = defineStore('filter', () => {
  const programFilters = ref<programFiltersType>({
    programAidTypeSelected: '',
    objectifTypeSelected: ''
  })

  function resetFilters() {
    programFilters.value = {
      programAidTypeSelected: '',
      objectifTypeSelected: ''
    }
  }

  return {
    resetFilters,
    programFilters
  }
})
