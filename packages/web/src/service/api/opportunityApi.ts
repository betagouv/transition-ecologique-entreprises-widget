import { useUsedTrackStore } from '@/stores/usedTrack'
import { PublicodesKeys, QuestionnaireDataEnum, QuestionnaireRoute, TrackId } from '@/types'
import type { OpportunityBody, ReqResp, WithoutNullableKeys, OpportunityFormType } from '@/types'
import RequestApi from '@/service/api/requestApi'
import TrackStructure from '@/utils/track/trackStructure'

export default class OpportunityApi extends RequestApi<any> {
  protected readonly url = '/api/opportunities'
  private readonly headers = {
    accept: 'application/json',
    'content-type': 'application/json'
  }

  private usedTrackStore = useUsedTrackStore()

  private _opportunityForm: WithoutNullableKeys<OpportunityFormType>

  constructor(
    opportunityForm: OpportunityFormType,
    private _programId: string
  ) {
    super()
    this._opportunityForm = opportunityForm as WithoutNullableKeys<OpportunityFormType>
  }

  async fetch() {
    let resp: ReqResp = {}
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(this.payload())
      })

      resp = (await response.json()) as ReqResp
      resp.ok = response.ok
      resp.status = response.status
      resp.statusText = response.statusText
      resp.url = response.url
    } catch (error: unknown) {
      resp.ok = false
      resp.status = 500
      resp.statusText = 'Internal server error'
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      resp.message = `${error}`
    }

    return resp
  }

  payload(): OpportunityBody {
    return {
      opportunity: {
        firstName: this._opportunityForm.name.value,
        lastName: this._opportunityForm.surname.value,
        email: this._opportunityForm.email.value,
        phoneNumber: this._opportunityForm.tel.value,
        companySiret: this._opportunityForm.siret.value,
        companyName: this.getFromUsedTrack(TrackId.Siret, 'denomination'),
        companySector: TrackStructure.getSector(),
        companySize: (this.getFromUsedTrack(TrackId.StructureWorkforce, PublicodesKeys.Workforce) as unknown as number) ?? undefined, // get from usedTrack
        programId: this._programId,
        message: this._opportunityForm.needs.value,
        questionnaireRoute: this.getFromUsedTrack(
          TrackId.QuestionnaireRoute,
          QuestionnaireDataEnum.questionnaire_route as string
        ) as QuestionnaireRoute, // get from usedTrack
        otherData: this.getAllValuesFromUsedTrack(),
        linkToProgramPage: this._opportunityForm.linkToProgramPage.value
      },
      optIn: this._opportunityForm.cgu.value
    }
  }

  private getFromUsedTrack(trackId: TrackId, key: string) {
    return this.usedTrackStore.findInQuestionnaireDataByTrackIdAndKey(trackId, key)
  }

  private getAllValuesFromUsedTrack() {
    return JSON.stringify(this.usedTrackStore.completedQuestionnaireData)
  }
}
