import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}))

interface Props {
  readonly tag: string
}

export default function RightSide({ tag }: Props) {

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Sponsored Link
      </Typography>
    </React.Fragment>
  );
}
