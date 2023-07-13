import { needs } from './trackNeeds'
import { siret } from './trackSiret'
import { sizes } from './trackStructureSizes'
import { sectors } from './trackSectors'
import { roles } from './trackRoles'
import { goals } from './trackGoals'
import { status } from './trackStatus'
import { results } from './trackResults'

export const tracks = [
  needs,
  siret,
  sizes,
  status,
  roles,
  goals,
  sectors,
  results 
]
