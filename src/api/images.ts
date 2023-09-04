import axios from 'axios'
import * as fs from 'fs'
import * as cliProgress from 'cli-progress'
import colors from 'ansi-colors'

import { EXPORT_NH_PATH, FILE_COVER_PATH, FILE_IMAGE_PATH, NH_IMAGE_URL, NH_THUMBNAIL_URL } from '../config/constants'
import { IHifuminPageImage } from '../types/hifumin'

const multiBar = new cliProgress.MultiBar(
  {
    clearOnComplete: false,
    hideCursor: true,
    format: `{filename} | ${colors.cyan('{bar}')} | {percentage}%`,
  },
  cliProgress.Presets.legacy,
)

export const getThumbnail = async (id: number, mediaId: number) => {
  const urlEndpoint = NH_THUMBNAIL_URL.replace('{mediaId}', String(mediaId)).toString()
  const exportPath = EXPORT_NH_PATH.replace('{id}', String(id)).toString() + '/'

  const progressBar = multiBar.create(1, 0)

  const res = await axios.get(urlEndpoint, {
    responseType: 'stream',
    onDownloadProgress: ({ progress }) => {
      progressBar.start(1, 0)

      progressBar.increment()
      progressBar.update(progress as number, { filename: 'cover.jpg' })
    },
  })

  try {
    await res.data.pipe(fs.createWriteStream(exportPath + FILE_COVER_PATH))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export const getImage = (id: number, mediaId: number, pages: IHifuminPageImage[], limit: number | null) => {
  const maxPages = limit ?? pages.length

  for (let i = 1; i <= maxPages; i++) {
    setTimeout(async () => {
      const urlEndpoint = NH_IMAGE_URL.replace('{mediaId}', String(mediaId)).replace('{page}', String(i)).toString()
      const fileImagePath = FILE_IMAGE_PATH.replace('{page}', String(i)).toString()
      const exportPath = EXPORT_NH_PATH.replace('{id}', String(id)).toString() + '/'

      const progressBar = multiBar.create(1, 0)

      const res = await axios.get(urlEndpoint, {
        responseType: 'stream',
        onDownloadProgress: ({ progress }) => {
          progressBar.start(1, 0)
          progressBar.increment()
          progressBar.update(progress as number, { filename: `${i}.jpg` })

          multiBar.stop()
        },
      })

      try {
        await res.data.pipe(fs.createWriteStream(exportPath + fileImagePath))
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    }, 1000 * i)
  }
}
