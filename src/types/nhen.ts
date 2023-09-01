export interface IHen {
  id: number
  numPages: number
  mediaId: number
  uploadDate: number
  title: {
    en: string
    jp: string
  }
  images: {
    pages: Image[]
  }
}

export interface Image {
  t: string
  w: number
  h: number
}
