export default interface Translation {
  [key: string]: string | ((...args: string[]) => string) | Translation
}
