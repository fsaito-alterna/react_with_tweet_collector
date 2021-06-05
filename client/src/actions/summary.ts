import { Dispatch } from 'redux'

import { http, HttpResponse, authorizationHeader } from '../utils/http'
import { X_API_KEY } from '../appConfig'
import { SearchTag, Summary } from '../models/tweets'

export enum SummaryActionType {
  GET_SUCCESS = 'SUMMARY_GET_SUCCESS',
  GET_FAILURE = 'SUMMARY_IDS_GET_FAILURE',
}

export interface SummaryAction {
  readonly type: SummaryActionType
  readonly data?: Array<Summary>
}

const getSummarySuccess = (data: Array<Summary>): SummaryAction => ({
  type: SummaryActionType.GET_SUCCESS,
  data,
})
const getSummaryFailure = (): SummaryAction => ({
  type: SummaryActionType.GET_FAILURE,
})

export const getSummary = (tags: Array<SearchTag>) => async (dispatch: Dispatch) => {
  try {
    const res: HttpResponse<any> = await http.get('/summary.json', authorizationHeader(X_API_KEY), {})
    const results = tags.map((searchTag: SearchTag) => {
      const data = res.data[searchTag.bucket]
      return data || null
    })
    const filtered = results.filter(result => result)

    if (res.status === 200) {
      dispatch(getSummarySuccess(filtered))
    }
  } catch (err) {
    dispatch(getSummaryFailure())
  }
}
