import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import { Tweet, SearchTag, Summary } from '../../models/tweets'
import titleTags from '../../../../lambda/get_tweets/config/twitter.json'

// import List from './List'
import Routes from './Routes'
import RightList from './RightList'
import LivedoorRSS from '../Header/LivedoorRSS'
import Bottom from '../Common/Ads/Bottom'

const useStyles = makeStyles(theme => ({
  mainGrid: {
  },
}));

interface Props {
  readonly onClickTag: (tag: string) => void
  readonly tag: string
  readonly tweets: Array<Tweet>
  readonly summary: Array<Summary>
}

export default function Blog({ tag, tweets, summary }: Props) {
  const tags: Array<SearchTag> = titleTags['search_words']

  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        <Grid container spacing={5} className={classes.mainGrid}>
          {/* Main content */}
          <Grid item xs={12} md={8}>
            <Routes tags={tags} tweets={tweets} summary={summary} />
            <Divider />
            <Bottom />
            <LivedoorRSS id="294641" />
          </Grid>
          {/* End main content */}
          {/* Right Sidebar */}
          <RightList tag={tag} tags={tags} tweets={tweets} />
          {/* End sidebar */}
        </Grid>
      </main>
    </React.Fragment>
  );
}
