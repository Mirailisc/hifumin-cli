export const getPagesById = `
query GET_PAGES_BY_ID($id: Int!) {
  nhentai {
    by(id: $id) {
      id
      numPages
      mediaId
      uploadDate
      title {
        english
        japanese
      }
      images {
        pages {
          t
          w
          h
        }
      }
    }
  }
}`
