#!/usr/bin/env node

import * as fs from 'fs'
import * as inquirer from 'inquirer'
import colors from 'ansi-colors'

import { exportYAML, fetchApi } from './api/hifumin'
import { getImage, getThumbnail } from './api/images'
import { EXPORT_DIR, EXPORT_NH_PATH } from './config/constants'
import { promptQuestions } from './config/prompt'

const run = async (id: number, pageLimit: number | null) => {
  const res = await fetchApi(id)

  const exportPath = EXPORT_NH_PATH.replace('{id}', String(res.id)).toString()

  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR)
  }

  if (fs.existsSync(exportPath)) {
    console.log('Doujin already exists in your exported directory.')
    process.exit(1)
  }

  fs.mkdirSync(exportPath)

  await exportYAML(res, pageLimit)
  await getThumbnail(res.id, res.mediaId)
  getImage(res.id, res.mediaId, res.images.pages, pageLimit)
}

const prompt = inquirer.createPromptModule()

console.log(colors.magenta('Hifumin CLI by Mirailisc'))

prompt(promptQuestions).then((answer) => {
  const id = parseInt(answer.id)
  const pageLimit = answer.limitPage ? parseInt(answer.limitPage) : null

  run(id, pageLimit)
})
