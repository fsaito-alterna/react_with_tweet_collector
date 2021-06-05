
import { TweetIdsAction, TweetIdsActionType } from '../actions/tweets'
import { Tweet } from '../models/tweets'

const DEFAULT_STATE: Array<Tweet> = []

export default (state: Array<Tweet> = DEFAULT_STATE, action: TweetIdsAction) => {
  switch (action.type) {
    case TweetIdsActionType.GET_SUCCESS:
      const input = {tag: action.tag, ids: (action.data || [])}
      const result = state.concat([input])
      return result
    case TweetIdsActionType.GET_FAILURE:
      return state
    default:
      return state
  }
}
