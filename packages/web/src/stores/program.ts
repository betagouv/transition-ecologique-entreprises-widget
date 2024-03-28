// CONSOLE LOG TEMPLATE
// console.log(`store.programs > FUNCTION_NAME > MSG_OR_VALUE :`)

import ProgramApi from '@/service/api/programApi'
import { useUsedTrackStore } from '@/stores/usedTrack'
import ProgramFilter from '@/utils/program/programFilters'
import { Result } from 'true-myth'
import { computed, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { type programFiltersType, ProgramAidType, Objectives, type ProgramData } from '@/types'
import type { QuestionnaireData } from '@tee/backend/src/program/domain/types'

export const useProgramStore = defineStore('program', () => {
  const currentProgram = ref<ProgramData>()
  const hasPrograms = ref<boolean>(false)

  const programFilters = ref<programFiltersType>({
    programAidTypeSelected: '',
    objectifTypeSelected: ''
  })

  const programs = computed(async () => {
    const result = await getPrograms()

    if (result.isOk) {
      hasPrograms.value = result.value.length > 0
    }

    return result
  })

  const programsByUsedTracks = computed(async () => {
    // filter out programs
    return await getPrograms(useUsedTrackStore().getQuestionnaireData())
  })

  async function getPrograms(questionnaireData: QuestionnaireData = {}) {
    return await new ProgramApi(questionnaireData).get()
  }

  function getProgramsByFilters(programs: ProgramData[]) {
    return programs.filter((program: ProgramData) => {
      return (
        ProgramFilter.filterProgramsByAidType(program, programFilters.value.programAidTypeSelected as ProgramAidType) &&
        ProgramFilter.filterProgramsByObjective(program, programFilters.value.objectifTypeSelected as Objectives)
      )
    })
  }

  async function getProgramById(id: string): Promise<Result<ProgramData, Error>> {
    currentProgram.value = undefined

    if (hasPrograms.value) {
      const result = await programs.value
      if (result.isOk) {
        const program = result.value.find((program) => program.id === id)
        if (program) {
          currentProgram.value = program
          return Result.ok(currentProgram.value)
        }

        return Result.err(new Error('Program not found'))
      }

      return Result.err(result.error)
    }

    const result = await new ProgramApi().getOne(id)
    if (result.isOk) {
      currentProgram.value = result.value
    }

    return result
  }

  function resetFilters() {
    programFilters.value = {
      programAidTypeSelected: '',
      objectifTypeSelected: ''
    }
  }

  return {
    programs,
    currentProgram,
    programFilters,
    programsByUsedTracks,
    getProgramsByFilters,
    getProgramById,
    resetFilters
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProgramStore, import.meta.hot))
}
