import axios from 'axios'
import YAML from 'yaml'
import * as fs from 'fs'
import { createSpinner } from 'nanospinner'
import colors from 'ansi-colors'

import { IHifuminJson, IHifuminPage } from '../types/hifumin'
import { EXPORT_NH_PATH, FILE_INFO_PATH, GQL_ENDPOINT } from '../config/constants'
import { getPagesById } from '../gql/hifumin'
import { axiosOptions } from '../config/axios-options'
import { sleep } from '../utils/utils'

export const fetchApi = async <const T extends IHifuminPage>(id: number): Promise<T> => {
  let resData: T | null = null

  try {
    const { data } = await axios.post(
      GQL_ENDPOINT,
      {
        query: getPagesById,
        variables: {
          id,
        },
      },
      {
        headers: axiosOptions,
      },
    )

    resData = await data.data.nhentai.by
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  return resData as T
}

export const exportYAML = async (res: IHifuminPage, pageLimit: number | null) => {
  const exportPath = EXPORT_NH_PATH.replace('{id}', String(res.id)).toString() + '/' + FILE_INFO_PATH

  const spinner = createSpinner(colors.blueBright('Fetching')).start()
  await sleep()

  const apiJsonObject: IHifuminJson & { uploadDate: string } = {
    id: res.id,
    title: {
      english: res.title.english,
      japanese: res.title.japanese,
    },
    pageLimit: pageLimit ?? res.numPages,
    allPages: res.numPages,
    uploadDate: new Date(res.uploadDate * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      day: '2-digit',
      month: 'long',
    }),
    tags: res.tags.map((tag) => tag.name),
  }

  const yaml = YAML.stringify(apiJsonObject)

  try {
    fs.writeFileSync(exportPath, yaml)
    spinner.success({ text: colors.greenBright('Information generated (info.yaml)') })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
