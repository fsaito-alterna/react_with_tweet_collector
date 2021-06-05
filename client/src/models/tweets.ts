export interface SearchTag {
  readonly keyword: string
  readonly bucket: string
  readonly category: string
}

export interface Tweet {
  readonly tag: string
  readonly ids: Array<string>
}

export interface Summary {
  readonly hash: string
  readonly tag: string
  readonly id: string
  readonly all_length: number
  readonly update_length: number
  readonly is_update: boolean
}