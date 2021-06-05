
import { SummaryAction, SummaryActionType } from '../actions/summary'
import { Summary } from '../models/tweets'

const DEFAULT_STATE: Array<Summary> = []

export default (state: Array<Summary> = DEFAULT_STATE, action: SummaryAction) => {
  switch (action.type) {
    case SummaryActionType.GET_SUCCESS:
      return action.data
    case SummaryActionType.GET_FAILURE:
      return state
    default:
      return state
  }
}
