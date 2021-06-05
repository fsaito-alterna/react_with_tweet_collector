import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Summary } from '../../../models/tweets'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TweetEmbed from 'react-tweet-embed'

import { summaryTitleHome } from '../../../utils/uiUtility'
import Ogp from '../../Common/Ogp'

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface Props {
  readonly summary: Array<Summary>
}

export default function Home({summary}: Props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Ogp isRoot/>
      {summary.map(item => {
        const id = item.id
        return (
          <Container key={`${item.tag}-${id}`} className={classes.cardGrid} maxWidth="md">
            <Grid item xs={10} sm={10} md={10}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link display="block" variant="body1" href={`/${item.tag}`}>
                      {summaryTitleHome(item)}
                    </Link>
                  </Typography>
                  { id ? <TweetEmbed key={id} id={id} placeholder={'loading'} options={{width: 550}} /> : null}
                </CardContent>
              </Card>
            </Grid>
          </Container>
        )
      })}
    </React.Fragment>
  );
}
