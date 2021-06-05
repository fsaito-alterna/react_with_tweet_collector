import i18n from '../locale'
import { Tweet, SearchTag, Summary } from '../models/tweets'
import { BUCKET_PREFIX } from '../appConfig'

export const dateText = (date: Date): string => {
  return (
    date.getFullYear().toString() +
    i18n.common.year +
    (date.getMonth() + 1).toString() +
    i18n.common.month +
    date.getDate().toString() +
    i18n.common.date
  )
}

export const dateForInputValue = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = (date.getMonth() + 1).toString().padStart(2, '0')
  const dd = date
    .getDate()
    .toString()
    .padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const toUnderscored = (text: string): string =>
  text.replace(/\.?([A-Z])/g, (x: string, y: string) => `_${y.toLowerCase().replace(/^_/, '')}`)

export const toCamelCased = (text: string): string => text.replace(/_([a-z])/g, (x: string) => x[1].toUpperCase())
export const kebabToCamelCased = (text: string): string => text.replace(/-([a-z])/g, (x: string) => x[1].toUpperCase())

export const tagToKeyword = (tags: Array<SearchTag>, input: string) => {
  const tag = tags.find((tag) => tag.bucket === `${BUCKET_PREFIX}${input}`)
  return tag ? tag.keyword : ''
}

export const summaryTitle = (tags: Array<SearchTag>, input: string, tweets: Array<Tweet>) => {
  const hash = tagToKeyword(tags, input)
  const tweet: Tweet | undefined = tweets.find((item) => item.tag === input)
  const ids = tweet ? tweet.ids : []
  return `[${hash}] ${i18n.common.summary}｜[${ids.length}件]`
}

export const summaryTitleHome = (item: Summary) => {
  return `[${item.update_length}件更新] ${item.hash} ${i18n.common.summary}`
}

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max))
}