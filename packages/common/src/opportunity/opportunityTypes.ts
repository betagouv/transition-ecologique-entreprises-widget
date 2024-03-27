import { type Opportunity } from '@tee/backend/src/opportunity/domain/types'

export interface OpportunityBody {
  opportunity: Opportunity
  optIn: boolean
}
