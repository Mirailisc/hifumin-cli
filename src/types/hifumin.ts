export interface IHifuminPage {
  id: number
  numPages: number
  mediaId: number
  uploadDate: number
  title: {
    english: string
    japanese: string
  }
  images: {
    pages: Image[]
  }
  tags: Tag[]
}

export interface Image {
  t: string
  w: number
  h: number
}

export interface Tag {
  name: string
}

type excludeTypes = 'images' | 'mediaId' | 'uploadDate' | 'numPages' | 'tags'

export interface IHifuminJson extends Omit<IHifuminPage, excludeTypes> {
  pageLimit: number | null
  allPages: number
  tags: string[]
}
