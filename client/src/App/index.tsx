import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import { getTweetIds } from '../actions/tweets'
import { getSummary } from '../actions/summary'
import { Tweet, SearchTag, Summary } from '../models/tweets'

import titleTags from '../../../lambda/get_tweets/config/twitter.json'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Blog from './Blog'
import Footer from './Footer'
import Header from './Header'
import { BUCKET_PREFIX } from '../appConfig'

import '../css/base.scss'

interface Props extends RouteComponentProps<any> {
  readonly tweets: Array<Tweet>
  readonly summary: Array<Summary>
  readonly getTweetIds: (param: string) => void
  readonly getSummary: (param: Array<SearchTag>) => void
}

interface State {
  readonly menu: string
  readonly tag: string
}

const tags: Array<SearchTag> = titleTags['search_words']

class App extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      menu: 'menu',
      tag: '',
    }
  }

  public componentDidMount() {
    const { getTweetIds, getSummary, location } = this.props

    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)

    getSummary(tags)
    tags.map((tag) => {
      getTweetIds(tag.bucket.replace(BUCKET_PREFIX,''))
    })
  }

  public render() {
    const { tweets, location, summary } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header tags={tags} />
          <Blog
            tag={location.pathname.replace('/', '')}
            tweets={tweets}
            onClickTag={this.onClickTag}
            summary={summary}
          />
          <Footer/>
        </Container>
      </React.Fragment>
    )
  }

  public onClickTag = (tag: string) => {
    this.setState({tag})
  }
}

const mapStateToProps = ({ summary, tweets }: any) => ({ summary, tweets })
const actionCreators = {
  getTweetIds,
  getSummary,
}

export default connect(
  mapStateToProps,
  actionCreators,
)(withRouter(App))
