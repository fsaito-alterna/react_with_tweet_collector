import React from 'react'
import Helmet from 'react-helmet'

import locale from '../../../locale'

interface Props {
  isRoot: boolean
  title?: string
  description?: string
}

export default function Ogp({isRoot, title, description}: Props) {
  const type = isRoot ? 'website' : 'article'
  const blogTitle = locale.header.title_detail

  return(
    <Helmet>
      <meta property="og:title" content={title || blogTitle} />
      <meta property="og:description" content={description || locale.header.about} />

      <meta property="og:url" content={locale.common.url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={blogTitle} />
      <meta property="og:image" content={'https://sample-web.com/image.png'} />
      <meta property="fb:app_id" content={'471485393722595'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={locale.sns.twitter} />
    </Helmet>
  )
}
