type Item = {
  value: string
}

type FileRequest = {
  fileName: string,
  items: Item[] | null
}

type FileResponse = {
  message: string,
}

export type { FileRequest, FileResponse, Item }
