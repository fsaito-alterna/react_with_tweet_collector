import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import locale from '../../../locale'
import { Tweet, SearchTag } from '../../../models/tweets'

import RightSide from '../../Common/Ads/RightSide'
import { BUCKET_PREFIX } from '../../../appConfig'


const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    color: theme.palette.primary.main,
  },
}));

interface Props {
  readonly tag: string
  readonly tags: Array<SearchTag>
  readonly tweets: Array<Tweet>
}

export default function RightList({ tag, tags, tweets }: Props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography>
            {locale.header.about}
          </Typography>
        </Paper>
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          Tags
        </Typography>
        {tags.map(tag => {
          const tagFromBucket = tag.bucket.replace(BUCKET_PREFIX, '')
          const tweet: Tweet | undefined = tweets.find((item) => item.tag === tagFromBucket)
          const ids = tweet ? tweet.ids : []
          return (
            <Typography key={tag.bucket} variant="body1" >
              <Link display="block" variant="body1" href={`/${tagFromBucket}`}>
              {`${tag.keyword} (${ids.length})`}
              </Link>
            </Typography>
          )
        })}
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          {locale.menu.blog}
        </Typography>
        <List>
          <ListItem className={classes.listItem} button component="a" href="http://sample.net" target="_blank">
            <ListItemText primary="sample link" />
          </ListItem>
        </List>
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          Social
        </Typography>
        <RightSide tag={tag}/>
      </Grid>
    </React.Fragment>
  );
}
