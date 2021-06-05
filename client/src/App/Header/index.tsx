import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import locale from '../../locale'
import { SearchTag } from '../../models/tweets'

import { BUCKET_PREFIX } from '../../appConfig'

const styles: any = (theme: any) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
})

const sections = [
  { key: 'section1', title: 'Section1'},
  { key: 'section2', title: 'Section2'},
];

interface Props {
  classes: any
  tags: Array<SearchTag>
}

interface State {
  isMounted: boolean
  anchorEl: any
  isOpenObject: {section1: boolean, section2: boolean}
}

class Header extends React.Component<Props, State> {
  public instance: any
  public constructor(props: Props) {
    super(props)
    this.state = {
      isMounted: false,
      anchorEl: null,
      isOpenObject: {section1: false, section2: false},
    }
  }

  public componentDidUpdate() {
    const { isMounted } = this.state
    if (!isMounted) {
      this.setState({isMounted: true})
    }
  }

  private onClickMenu1 = (e: any) => {
    this.setState({anchorEl: e.currentTarget, isOpenObject: {section1: true, section2: false}})
  }

  private onClickMenu2 = (e: any) => {
    this.setState({anchorEl: e.currentTarget, isOpenObject: {section1: false, section2:true }})
  }

  public handleClose = () => {
    this.setState({isOpenObject: {section1: false, section2: false}})
  };

  public render() {
    const { classes, tags } = this.props;
    const { anchorEl, isOpenObject } = this.state;
    return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link display="block" color="inherit" href={'/'}>
            {locale.header.title_detail}
          </Link>
        </Typography>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <div key={section.key}>
            <Button
              className={classes.toolbarLink}
              onClick={section.key === 'section1' ? this.onClickMenu1 : this.onClickMenu2}
            >
              {locale.header[section.key]}
            </Button>
            <Menu
              id="simple-menu"
              open={isOpenObject[section.key]}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              keepMounted
            >
              {
                tags.filter((tag) => tag.category === section.key).map(tag => (
                  <MenuItem key={tag.bucket} onClick={this.handleClose}>
                    <Link display="block" color="inherit" href={`/${tag.bucket.replace(BUCKET_PREFIX, '')}`}>
                      {tag.keyword}
                    </Link>
                  </MenuItem>
                ))
              }
            </Menu>
          </div>
        ))}
      </Toolbar>
    </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Header)
