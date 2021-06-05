import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import locale from '../../locale'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {locale.header.title}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            {locale.header.title_detail}
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" component="p">
          {locale.email.email}
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </React.Fragment>
  );
}
