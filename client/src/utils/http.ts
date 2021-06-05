import i18n from '../locale'

const send = (method: string, path: string, headers: HeadersInit, prefixPath: string) =>
  fetch(prefixPath + path, { method, headers })

const sendJson = (method: string, path: string, body: object, headers: HeadersInit, prefixPath: string) =>
  fetch(prefixPath + path, {
    method,
    body: JSON.stringify(body),
    headers,
  })

const sendFile = (method: string, path: string, headers: HeadersInit, file: File) =>
  fetch(path, {
    method,
    body: file,
    headers,
  })

export interface HttpResponse<T> {
  readonly status: number
  readonly headers: Headers
  readonly data: T
}

const resWithJson = async (res: Response): Promise<HttpResponse<any>> =>
  res
    .json()
    .then((data: any) => ({ status: res.status, headers: res.headers, data }))
    .catch(() => ({
      status: 500,
      headers: new Headers(),
      data: {
        name: i18n.http.unexpectedJsonError.name,
        description: i18n.http.unexpectedJsonError.description,
      },
    }))

const resWithEmptyJson = (): HttpResponse<any> => ({
  status: 200,
  headers: new Headers(),
  data: {},
})

export const serviceUnavailable = (): HttpResponse<any> => ({
  status: 503,
  headers: new Headers(),
  data: {
    name: i18n.http.serviceUnavailable.name,
    description: i18n.http.serviceUnavailable.description,
  },
})

const encodeKV = (key: string, value: string) => [key, value].map(encodeURIComponent).join('=')
const encodeKVs = (map: object) =>
  Object.keys(map)
    .map(key => encodeKV(key, map[key]))
    .join('&')
const withQuery = (path: string, queryString: string) => (queryString ? `${path}?${queryString}` : path)
const jsonHeader = { 'content-type': 'application/json' }

export const authorizationHeader = (key: string): HeadersInit => {
  return { 'X-API-KEY': key }
}

export const http = {
  get: (path: string, header: HeadersInit, query: object = {}, prefixPath: string = '') =>
    send('GET', withQuery(path, encodeKVs(query)), header, prefixPath)
      .then(resWithJson)
      .catch(serviceUnavailable),
  post: (path: string, header: HeadersInit, body: object, prefixPath: string = '') =>
    sendJson('POST', path, body, { ...jsonHeader, ...header }, prefixPath)
      .then(resWithJson)
      .catch(serviceUnavailable),
  put: (path: string, header: HeadersInit, body: object, prefixPath: string = '', sessionKey?: string) =>
    sendJson('PUT', path, body, { ...jsonHeader, ...header }, prefixPath)
      .then(resWithJson)
      .catch(serviceUnavailable),
  putFile: (path: string, headers: HeadersInit, file: File) =>
    sendFile('PUT', path, headers, file)
      .then(resWithEmptyJson)
      .catch(serviceUnavailable),
  delete: (path: string, header: HeadersInit, query: object = {}, prefixPath: string = '', sessionKey?: string) =>
    send('DELETE', withQuery(path, encodeKVs(query)), header, prefixPath)
      .then(resWithEmptyJson)
      .catch(serviceUnavailable),
}
