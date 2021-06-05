import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  topBanner: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default function Top() {

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography className={classes.topBanner}>
      </Typography>
    </React.Fragment>
  )
}
