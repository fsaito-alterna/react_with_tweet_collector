import Translation from '../translation'

const ja: Translation = {
  common: {
    userId: 'USER ID',
    summary: 'Site Summary',
    url: 'https://sample-web.com'
  },
  menu: {
    home: 'ホーム',
    blog: '登録サイト',
  },
  header: {
    title: 'sample-web.com',
    title_detail: 'title detail',
    description: 'description',
    about: 'about',
    section1: 'Section1',
    section2: 'Section2'
  },
  email: {
    email: ''
  },
  sns: {
    twitter: '@sample-web_com'
  },
  http: {
    unexpectedJsonError: {
      name: 'unexpectedJsonError',
      description: '予期せぬエラーが発生しました',
    },
    serviceUnavailable: {
      name: 'serviceUnavailable',
      description: 'サーバへの接続に失敗しました',
    },
    notFound: {
      name: 'notFound',
      description: '該当のコンテンツが見つかりませんでした',
    },
  },
}

export default ja
