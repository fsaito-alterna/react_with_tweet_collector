import { Dispatch } from 'redux'

import { http, HttpResponse, authorizationHeader } from '../utils/http'
import { API_PATH_GET_IDS, BUCKET_PREFIX, PREFIX_PATH_API_GATEWAY, X_API_KEY } from '../appConfig'

export enum TweetIdsActionType {
  GET_SUCCESS = 'TWEET_IDS_GET_SUCCESS',
  GET_FAILURE = 'TWEET_IDS_GET_FAILURE',
}

export interface TweetIdsAction {
  readonly type: TweetIdsActionType
  readonly tag: string
  readonly data?: Array<string>
}

export type TweetAction = TweetIdsAction
const getIdsSuccess = (tag: string, data: Array<string>): TweetIdsAction => ({
  type: TweetIdsActionType.GET_SUCCESS,
  tag,
  data,
})
const getIdsFailure = (tag: string): TweetIdsAction => ({
  type: TweetIdsActionType.GET_FAILURE,
  tag,
})

interface IncomingResponseBody {
  readonly ids:Array<string>
}

export const getTweetIds = (tag: string) => async (dispatch: Dispatch) => {
  const query = { bucket: `${BUCKET_PREFIX}${tag}` }
  try {
    const host = PREFIX_PATH_API_GATEWAY
    const res: HttpResponse<IncomingResponseBody> = await http.get(API_PATH_GET_IDS, authorizationHeader(X_API_KEY), query, host)
    if (res.status === 200) {
      dispatch(getIdsSuccess(tag, res.data.ids.sort().reverse()))
    }
  } catch (err) {
    dispatch(getIdsFailure(tag))
  }
}
