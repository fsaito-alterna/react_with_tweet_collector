import React from 'react'
import { Route, Switch } from 'react-router-dom'

import List from '../List'
import Home from '../Home'

import { Tweet, SearchTag, Summary } from '../../../models/tweets'
import { BUCKET_PREFIX } from '../../../appConfig'

interface Props {
  readonly tags: Array<SearchTag>
  readonly tweets: Array<Tweet>
  readonly summary: Array<Summary>
}

export default ({ tags, tweets, summary }: Props) => {
  let lists = tags.map((tag) => <Route key={tag.bucket} exact path={tag.bucket.replace(BUCKET_PREFIX, '/')} render={() => <List tags={tags} tweets={tweets} />} />)
  lists = lists.concat([(<Route key={"home"} exact path={'/'} render={() => <Home summary={summary}/>} />)])
  return (
    <Switch>
      {lists}
    </Switch>
  )
}
