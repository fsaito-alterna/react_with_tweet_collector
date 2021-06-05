import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TweetEmbed from 'react-tweet-embed'
import InfiniteScroll from 'react-infinite-scroller'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Pagination from 'material-ui-flat-pagination'

import { Tweet, SearchTag } from '../../../models/tweets'
import { getRandomInt, summaryTitle } from '../../../utils/uiUtility'
import Top from '../../Common/Ads/Top'
import Ogp from '../../Common/Ogp'

const SIZE = 10
const PAGE_SIZE = 50

interface Props extends RouteComponentProps {
  readonly tags: Array<SearchTag>
  readonly tweets: Array<Tweet>
}

export default withRouter(({ location, tags, tweets }: Props) => {
  const tag = location.pathname.replace('/', '') || 'halloween'
  const [currentTag, setCurrentTag] = useState<string>(tag);
  const tweet: Tweet | undefined = tweets.find((item) => item.tag === tag)
  const ids = tweet ? tweet.ids : []
  const [offset, setOffset] = useState<number>(1)
  const perPageIds = ids.slice(offset, offset + PAGE_SIZE)
  const [currentTweets, setCurrentTweets] = useState<Array<string>>(perPageIds.slice(0, SIZE));
  const [hasMore, setHasMore] = useState<boolean>(true);
  const title = summaryTitle(tags, currentTag, tweets)

  if (tag !== currentTag) {
    setCurrentTag(tag)
    setOffset(1)
    setCurrentTweets(ids.slice(0, SIZE))
    setHasMore(true)
  }

  if ((currentTweets.length === 0 && perPageIds.length > 0)) {
    setCurrentTweets(perPageIds.slice(0, SIZE))
  }

  return (
    <React.Fragment>
      <Ogp isRoot={false} title={title}/>
      <Typography variant="h1" component="h1" gutterBottom>
        <Box fontSize="h4.fontSize">
          {title}
        </Box>
      </Typography>
      <Divider />
      <Top/>
      <InfiniteScroll
        loadMore={() => {
          if (perPageIds.length === 0) {
            return
          }
          if ((currentTweets.length + SIZE) >= perPageIds.length) {
            console.log('end')
            setHasMore(false)
            return
          }
          setCurrentTweets(currentTweets.concat(perPageIds.slice(currentTweets.length, currentTweets.length + SIZE)))
        }}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        threshold={SIZE * 2}
      >
        {currentTweets.map((tweet, index) => (
          <React.Fragment key={tweet}>
            <TweetEmbed key={tweet} id={tweet} placeholder={'loading'} options={{width: 550}} />
            {(index % 10) === 5 ? renderAds() : null}
          </React.Fragment>
        ))}
      </InfiniteScroll>
      <Pagination
        limit={PAGE_SIZE}
        offset={offset}
        total={ids.length}
        onClick={(e: any, num: number) => {
          setOffset(num)
          setHasMore(true)
          const perPageIds = ids.slice(num, num + PAGE_SIZE)
          setCurrentTweets(perPageIds.slice(0, SIZE))
        }}
      />
    </React.Fragment>
  );
})

const ADS: JSX.Element[] = [
]
const renderAds = () => {
  const num = getRandomInt(ADS.length)
  return ADS[num]
}
